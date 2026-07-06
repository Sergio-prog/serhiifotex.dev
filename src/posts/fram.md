---
title: "Building Fram — one media pipeline, three interfaces"
date: "2026-06-28"
description: "Why my media toolkit has a CLI, an HTTP API, and a Telegram bot — and how they stay one codebase."
---

# Building Fram — one media pipeline, three interfaces

I process a lot of media: screenshots, memes, video clips. And every time I needed to crop, compress, or convert something, I reached for a different tool — a CLI here.
It is also a agent friendly — I made a skill for it, and it would be much easier to agent use this CLI instead of huge python pillow inline scripts.

By the way, I always wanted to create some TUI for a CLI tool, so here it is :)

## Examples

CLI for scripting:

```bash
fram resize input.jpg 128x128 -o output.jpg
fram cut input.mp4 --start 00:00:05 --end 00:00:12 -o clip.mp4
fram gif input.mp4 --fps 12 --width 480 -o clip.gif
```

Running just `fram` opens an interactive TUI instead — image previews right in the terminal, sliders for parameters. For when you don't remember the flags.

![preview of TUI](https://github.com/Sergio-prog/fram/blob/main/media/preview.png?raw=true "Preview of TUI")

## Installing
Install with the script (MacOS/Linux-like):
```bash
curl -LsSf https://fram.serhiifotex.dev/install.sh | sh

```

UV tool (Windows/Others):
```bash
uv tool install git+https://github.com/Sergio-prog/fram.git
```



---

It's a hobby project, I build it when I need a feature. Open source at [github.com/Sergio-prog/fram](https://github.com/Sergio-prog/fram).
