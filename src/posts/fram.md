---
title: "Fram — a media workshop with three faces"
date: "2026-06-28"
description: "Why I built a shared TypeScript core and wrapped it in CLI, REST API, and Telegram bot adapters."
tags: ["project", "typescript"]
---

## The problem

I keep collecting media — screenshots, memes, references, textures — and then forgetting where I put them. Existing tools are either too heavy (full DAM suites) or too narrow (single-purpose bots). I wanted something light, fast, and accessible from whatever surface I’m using at the moment.

## The idea

One shared core. Three adapters.

- **CLI** for scripting and batch work
- **REST API** for integrations and web hooks
- **Telegram bot** for quick saves on the go

All backed by the same TypeScript logic so behavior stays consistent.

## Architecture

The core lives in a single package: file handling, metadata extraction, tagging, search, and storage abstraction. Adapters are thin shells around it.

```
packages/
  core/          # shared engine
  cli/           # Commander.js interface
  api/           # Hono server
  bot/           # grammY Telegram bot
```

This keeps the CLI fast to start, the API easy to deploy, and the bot lightweight. When I fix a bug in search, all three surfaces get it for free.

## What I learned

- **Adapter boundaries matter.** The first draft let the bot call internal core methods directly. That created tight coupling and made testing painful. Now every adapter talks to core through a narrow, typed interface.
- **CLI ergonomics are underrated.** Good defaults, progress indicators, and sensible flags turn a script from “ugh, another tool” into “I’ll just run this real quick.”
- **Telegram bots are surprisingly powerful for personal workflows.** Inline queries, album handling, and instant thumbnails make it feel like a native app without the App Store.

## Where it’s going

I’m experimenting with a web gallery adapter and tighter EXIF/metadata indexing. If you’re curious, the code is open:

https://github.com/Sergio-prog/fram
