---
title: "Building Fram — a media workshop with a shared core"
date: "2026-06-28"
description: "Why I built a media processing toolkit with three adapters — CLI, HTTP API, and Telegram bot — all sharing one TypeScript core."
tags: ["project", "typescript", "python", "architecture"]
---

# Building Fram — a media workshop with a shared core

I process a lot of media — screenshots, memes, video clips, references. Every time I needed to crop, resize, compress, or convert something, I reached for a different tool: a CLI here, a web app there, a bot for quick Telegram shares. The interfaces were different, but the operations were the same.

Fram is my answer: a **shared TypeScript/Python processing core** wrapped in three adapter surfaces — CLI, HTTP API, and Telegram bot.

## Why a shared core?

The naive approach is three separate tools. That doesn't scale. Every new feature gets implemented three times, slightly differently. Every bug fix needs three patches.

Instead, Fram puts all media logic in a single typed core:

```
fram/
├── core/
│   ├── processors/         # ImageProcessor (Pillow) and VideoProcessor (FFmpeg)
│   ├── operation_factories/  # Build typed Operation objects
│   ├── operation_models/     # Dataclass params, not loose dicts
│   └── pipeline.py           # Dispatch to the right processor
├── cli/                    # Typer commands + Textual interactive TUI
├── api/                    # FastAPI routes with optional bearer auth
├── bot/                    # aiogram 3 bot with FSM + callback flow
└── utils/                  # Timecodes, sizes, file helpers
```

The `core` owns the actual media operations. Each adapter is just a thin translation layer.

## The CLI adapter

The CLI is the most direct interface. Strict commands for scripting, plus an interactive TUI for manual work:

```bash
fram resize input.jpg 128x128 -o output.jpg
fram crop input.jpg 128x128 --anchor center -o avatar.jpg
fram compress-image input.jpg --quality 80 -o compressed.webp
fram cut input.mp4 --start 00:00:05 --end 00:00:12 -o clip.mp4
fram gif input.mp4 --fps 12 --width 480 -o clip.gif
fram info input.jpg          # inspect dimensions, format, etc.
```

Interactive mode (`fram` or `fram input.jpg`) launches a Textual TUI with real terminal image previews and sliders for parameters.

## The HTTP API adapter

FastAPI with multipart form uploads:

```bash
curl -F "file=@image.jpg" \
  -F 'operations=[{"name":"resize","size":"128x128","mode":"fit"}]' \
  http://localhost:8000/media/process
```

Same operations, just mapped from JSON to typed `Operation` objects. Optional `FRAM_API_TOKEN` for bearer auth.

## The Telegram bot adapter

aiogram 3 with polling (or webhook). Send a media file, pick an action from the inline keyboard, enter parameters, add more operations or run. The bot downloads to `FRAM_WORK_DIR/bot`, runs the shared pipeline, and sends the result back as a document.

## What the shared core actually does

| Media | Operations |
|---|---|
| **Images** | resize, crop, compress, convert, rotate, flip, strip-metadata, blur, grayscale, adjust, sharpen, watermark, upscale, auto-orient, background |
| **Video** | cut, fps, compress, strip-audio, extract-audio, extract-frame, gif, speed, reverse, grayscale, rotate, flip, mute-audio, thumbnail, contact-sheet, extract-subtitles |

All operations are typed dataclasses, not loose dicts. The `Pipeline` dispatches to `ImageProcessor` (Pillow) or `VideoProcessor` (FFmpeg). The adapters never duplicate processing logic.

## Lessons learned

**Shared core, thin adapters.** If you write the same validation in two adapters, it belongs in core. The adapters are translators — they map user input to `Operation` objects and return results.

**CLI first.** Building the strict CLI forces clean operation definitions. Once the CLI works, the API and bot are almost free.

**Test the core.** The adapter tests are mostly integration — verifying that a Typer flag or a bot callback produces the right core call. The real tests live in `tests/core/`, checking that the processors actually transform media correctly.

**FFmpeg is the engine, not the API.** The core defines operations as typed structs; the video processor translates them to FFmpeg arguments. This means the backend could theoretically swap to something else without touching the adapters.

## What's next

The roadmap has SVG rasterization, target-file-size compression, a job queue for API/bot, and deployment examples. It's a hobby project — I build it when I need a feature.

Open source at [github.com/Sergio-prog/fram](https://github.com/Sergio-prog/fram).
