---
title: "Smart contract notes I keep relearning"
date: "2026-04-21"
description: "Small engineering reminders from backend and smart contract work: invariants, boring tests, and fewer clever tricks."
tags: ["smart-contracts", "security", "engineering"]
hidden: true
---

The annoying bugs are usually not hiding in the complicated math. They are hiding in the assumptions around it.

Write the invariant down. Then make the test fail when the invariant becomes a lie.

```solidity
assert(totalAssets >= accountedAssets);
```

## Things that keep paying rent

1. Name the invariant.
2. Test the boring path.
3. Test the rude path.
4. Assume future-you will forget the clever context.
