import {
  init as initThreshold,
  toThreshold,
  toGray,
} from "adaptive-threshold-wasm";

import { init as initWebp, decode as decodeWebp } from "libwebp-wasm";
import fs from "fs";
import path from "path";
import { encode } from "../src";
async function main() {
  await initThreshold();
  await initWebp();
  const p = path.resolve("./test/t.webp");
  const buf = fs.readFileSync(p);
  const { width, height, frameList } = await decodeWebp(buf);
  const rgba = frameList[0].data;
  const gray = toGray(rgba, width, height);
  const threshold = toThreshold(gray, width, height, 255, 1, 0, 25, 3);
  const s = encode(threshold, width, height).join("\n");
  fs.writeFileSync("./test/ascii.txt", s);
  console.log(s);
}

main();
