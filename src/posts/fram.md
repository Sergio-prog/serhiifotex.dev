---
title: "Building Fram — one media pipeline, three interfaces"
date: "2026-06-28"
description: "Why my media toolkit has a CLI, an HTTP API, and a Telegram bot — and how they all stay one codebase."
---

# Building Fram — one media pipeline, three interfaces

I process a lot of media: screenshots, memes, video clips, references. And every time I needed to crop, resize, compress, or convert something, I reached for a different tool — a CLI here, some sketchy web app there, a bot for quick Telegram shares. Different interfaces, same operations.

Fram is my fix for that: a single Python processing core with three thin adapters on top — CLI, HTTP API, and Telegram bot.

## Why one core?

Because the obvious alternative — three separate tools — means implementing every feature three times, slightly differently, and fixing every bug in three places. Been there.

So all the media logic lives in one typed core:

```
fram/
├── core/
│   ├── processors/         # ImageProcessor (Pillow), VideoProcessor (FFmpeg)
│   ├── operation_factories/  # build typed Operation objects
│   ├── operation_models/     # dataclass params, not loose dicts
│   └── pipeline.py           # dispatch to the right processor
├── cli/                    # Typer commands + Textual interactive TUI
├── api/                    # FastAPI routes with optional bearer auth
├── bot/                    # aiogram 3 bot with FSM + callback flow
└── utils/                  # timecodes, sizes, file helpers
```

The core owns the actual media operations. Each adapter just translates user input into `Operation` objects and hands back results.

## The CLI

The most direct interface. Strict commands for scripting:

```bash
fram resize input.jpg 128x128 -o output.jpg
fram crop input.jpg 128x128 --anchor center -o avatar.jpg
fram compress-image input.jpg --quality 80 -o compressed.webp
fram cut input.mp4 --start 00:00:05 --end 00:00:12 -o clip.mp4
fram gif input.mp4 --fps 12 --width 480 -o clip.gif
fram info input.jpg
```

Running just `fram` (or `fram input.jpg`) opens a Textual TUI instead — image previews right in the terminal, sliders for parameters. Good for manual work when you don't remember the flags.

## The HTTP API

FastAPI with multipart uploads:

```bash
curl -F "file=@image.jpg" \
  -F 'operations=[{"name":"resize","size":"128x128","mode":"fit"}]' \
  http://localhost:8000/media/process
```

Same operations, just mapped from JSON to typed `Operation` objects. Set `FRAM_API_TOKEN` if you want bearer auth.

## The Telegram bot

aiogram 3, polling or webhook. Send a file, pick an action from the inline keyboard, enter parameters, stack more operations or run. The bot downloads to `FRAM_WORK_DIR/bot`, runs the same pipeline, and sends the result back as a document.

## What the core actually does

| Media | Operations |
|---|---|
| **Images** | resize, crop, compress, convert, rotate, flip, strip-metadata, blur, grayscale, adjust, sharpen, watermark, upscale, auto-orient, background |
| **Video** | cut, fps, compress, strip-audio, extract-audio, extract-frame, gif, speed, reverse, grayscale, rotate, flip, mute-audio, thumbnail, contact-sheet, extract-subtitles |

Everything is typed dataclasses. The `Pipeline` dispatches to `ImageProcessor` (Pillow) or `VideoProcessor` (FFmpeg), and the adapters never touch processing logic directly.

## What I learned

If you find yourself writing the same validation in two adapters, it belongs in the core. The adapters should stay boring translators — the moment one of them gets clever, you're back to three tools.

Building the strict CLI first paid off: it forces clean operation definitions, and once those exist the API and bot are almost free.

Tests follow the same split. Adapter tests just check that a Typer flag or a bot callback produces the right core call; the real tests live in `tests/core/` and verify the processors actually transform media correctly.

One more thing: FFmpeg is the engine, not the API. The core defines operations as typed structs, and the video processor translates them to FFmpeg arguments — so the backend could be swapped without touching a single adapter.

## What's next

SVG rasterization, target-file-size compression, a job queue for the API and bot. It's a hobby project — I build it when I need a feature.

Open source at [github.com/Sergio-prog/fram](https://github.com/Sergio-prog/fram).
