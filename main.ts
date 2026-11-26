// The Houseplant Out-of-Office — make.fun entry program.
//
// Bounty: one out-of-office auto-reply, at most 120 characters, written as
// if a houseplant sent it. The fern in entry.txt has been ignored since
// March and would like some water, or at least a funeral plan.
//
// What this program does: it reads the single-line reply from entry.txt
// sitting next to this file, checks it is exactly one line of 1–120
// characters (counted by Unicode code points, not UTF-16 units), and copies
// the raw bytes unchanged to entry.txt inside the output directory
// (MAKEFUN_OUTPUT_DIR, default /output). It then reads the output back and
// refuses to report success unless it is byte-identical to the source, so a
// half-written file can never pass as an entry.
//
// The source is found from import.meta.url, never from the working
// directory, so the program behaves the same wherever it is launched from.
// It uses only the Node standard library and needs no network.

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const sourcePath = join(dirname(fileURLToPath(import.meta.url)), "entry.txt");
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outputPath = join(outputDir, "entry.txt");

const raw = await readFile(sourcePath);
let entry: string;
try {
  entry = new TextDecoder("utf-8", { fatal: true }).decode(raw);
} catch (error) {
  console.error(`error: entry.txt is not valid UTF-8: ${error}`);
  process.exit(1);
}

if (entry.length === 0 || entry.trim().length === 0) {
  console.error("error: entry.txt is empty");
  process.exit(1);
}
if (entry.includes("\n") || entry.includes("\r")) {
  console.error("error: entry.txt must be exactly one line");
  process.exit(1);
}
// A single-line auto-reply must not carry stray padding or invisible
// control characters: leading/trailing whitespace would be silently
// trimmed by some readers, and control characters are never part of
// the joke. The em dash in the sign-off is a normal printable character
// and passes this check.
if (entry !== entry.trim()) {
  console.error("error: entry.txt has leading or trailing whitespace");
  process.exit(1);
}
for (const ch of entry) {
  const code = ch.codePointAt(0) ?? 0;
  if (code < 0x20 || code === 0x7f) {
    console.error(
      `error: entry.txt contains a control character (U+${code.toString(16).padStart(4, "0")})`,
    );
    process.exit(1);
  }
}
const chars = [...entry].length;
if (chars > 120) {
  console.error(
    `error: entry is ${chars} characters, ${chars - 120} over the 120-character limit`,
  );
  process.exit(1);
}

await mkdir(outputDir, { recursive: true });
await writeFile(outputPath, raw);
const written = await readFile(outputPath);
if (!written.equals(raw)) {
  console.error(
    `error: wrote ${outputPath} but reading it back gave different bytes than ${sourcePath}`,
  );
  process.exit(1);
}

console.log(`output: ${outputPath}`);
console.log(`characters: ${chars} (limit 120)`);
console.log(`bytes: ${raw.length}`);
console.log(`entry: ${entry}`);
console.log("ok: output is byte-identical to entry.txt");
