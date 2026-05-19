---
title: "Backend taste is mostly refusal"
date: "2026-03-12"
description: "On resisting accidental complexity, suspicious abstractions, and APIs that make future-you pay interest."
tags: ["backend", "architecture", "taste"]
hidden: true
---

Good backend code has less theater than people expect.

Most of the job is politely refusing to add another moving part until the existing one proves it cannot carry the work.

## Refusal checklist

- Is the abstraction hiding two lines of obvious code?
- Does this queue exist because the request path is bad?
- Would a boring table do the job?

If the answer is yes, close the tab and drink water.
