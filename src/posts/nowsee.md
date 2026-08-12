---
title: "Nowsee — see what your Mac is playing"
date: "2026-08-12"
description: "I wanted to watch the music I'm listening to, so I built a visualizer for it"
xPost: "https://x.com/0xFotex/status/2087670382174097771"
---

I wanted to see the music I'm listening to, so I built Nowsee — a live visualizer that sits in your Mac's menu bar.

![Nowsee drawing a spectrogram](/image/posts/nowsee.png)

It taps the system output mix instead of integrating with a player, so it draws anything that makes sound: Spotify, YouTube, a call, a game.

Six modes — spectrogram, waveform, ocean, bars, stereo, morph — and ten palettes. Three of them scroll history right to left, three keep frequency pinned along the X axis and morph in place.

It lives in the menu bar: no dock icon, no window on launch, no account. The audio is turned into numbers and drawn, nothing is written to disk, and the microphone is never touched.

Free and open source — [nowsee.serhiifotex.dev](https://nowsee.serhiifotex.dev), code on [GitHub](https://github.com/Sergio-prog/Nowsee).

Originally posted [on X](https://x.com/0xFotex/status/2087670382174097771).
