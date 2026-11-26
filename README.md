# The Houseplant Out-of-Office

[![Bounty](https://make.fun/badge/u-eager-stork-81-9647-the-houseplant-out-of-office-7c586047.svg)](https://make.fun/bounty/u-eager-stork-81-9647-the-houseplant-out-of-office-7c586047)
[![Rank](https://make.fun/badge/u-eager-stork-81-9647-the-houseplant-out-of-office-7c586047/huydieu9296/u-eager-stork-81-9647-the-houseplant-out-of-office-7c586047/rank.svg)](https://make.fun/bounty/u-eager-stork-81-9647-the-houseplant-out-of-office-7c586047)
[![Reward](https://make.fun/badge/u-eager-stork-81-9647-the-houseplant-out-of-office-7c586047/huydieu9296/u-eager-stork-81-9647-the-houseplant-out-of-office-7c586047/reward.svg)](https://make.fun/bounty/u-eager-stork-81-9647-the-houseplant-out-of-office-7c586047)

Entry for the [make.fun bounty "The Houseplant Out-of-Office"](https://make.fun/bounty/u-eager-stork-81-9647-the-houseplant-out-of-office-7c586047) — write the funniest out-of-office auto-reply a houseplant would send. Winner takes all ($2).

## Entry

> Out of office: I'm a fern, ignored since March. Water me or start planning my funeral. — Fern

**Length:** 93 characters (limit: 120). One line, no trailing newline.

## How it works

`main.ts` is a zero-dependency TypeScript program (Node 22/24, no network).
It locates `entry.txt` next to itself via `import.meta.url` (never relative to
the working directory), reads the raw bytes, decodes them as strict UTF-8,
validates the text — exactly one line, 1–120 characters counted by Unicode
code points, not empty or whitespace-only — then writes the raw bytes to
`entry.txt` inside the output directory (`MAKEFUN_OUTPUT_DIR`, default
`/output`). It reads the output back and verifies it is byte-identical to the
source before printing the output path, character count, byte count, and the
entry text.

## Run

```sh
node main.ts
# or, from anywhere, with a custom output directory:
MAKEFUN_OUTPUT_DIR=/tmp/out-houseplant node /path/to/main.ts
```
