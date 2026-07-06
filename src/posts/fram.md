---
title: "Building Fram — one media pipeline, three interfaces"
date: "2026-06-28"
description: "Why my media toolkit has a CLI, an HTTP API, and a Telegram bot — and how they stay one codebase."
---

# Building Fram — one media pipeline, three interfaces

I process a lot of media: screenshots, memes, video clips. And every time I needed to crop, compress, or convert something, I reached for a different tool — a CLI here, some sketchy web app there, a bot for quick Telegram shares. Different interfaces, same operations.

Fram is my fix: one Python processing core, three thin adapters on top — CLI, HTTP API, Telegram bot.

## Why one core?

Because three separate tools means implementing every feature three times and fixing every bug in three places. Been there.

The core owns all the operations — resize, crop, compress, convert, cut, gif, watermark, and a couple dozen more — backed by Pillow for images and FFmpeg for video. The adapters only translate user input into operations and hand back results.

## The interfaces

CLI for scripting:

```bash
fram resize input.jpg 128x128 -o output.jpg
fram cut input.mp4 --start 00:00:05 --end 00:00:12 -o clip.mp4
fram gif input.mp4 --fps 12 --width 480 -o clip.gif
```

Running just `fram` opens an interactive TUI instead — image previews right in the terminal, sliders for parameters. For when you don't remember the flags.

HTTP API for integrations:

```bash
curl -F "file=@image.jpg" \
  -F 'operations=[{"name":"resize","size":"128x128","mode":"fit"}]' \
  http://localhost:8000/media/process
```

And a Telegram bot for quick shares: send a file, pick actions from the inline keyboard, get the result back as a document.

## The one lesson worth stealing

Build the strict CLI first. It forces clean operation definitions, and once those exist, the API and the bot are almost free. If you catch yourself writing the same validation in two adapters — it belongs in the core.

It's a hobby project, I build it when I need a feature. Open source at [github.com/Sergio-prog/fram](https://github.com/Sergio-prog/fram).
