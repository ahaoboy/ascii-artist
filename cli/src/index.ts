#!/usr/bin/env node
import sharp from "sharp";
import fs from "fs";
import path from "path";
import { encode } from "../../src";
async function main() {
  const inputPath = path.resolve(process.argv[2]);
  const outputPath = path.resolve(process.argv[3]);
  if (!fs.existsSync(inputPath)) {
    console.log("input file not found: ", inputPath);
    return;
  }
  const r = sharp(inputPath)
    .threshold(100)
    .extractChannel(0)
    .raw()
    .toBuffer({ resolveWithObject: true })
    .then(function (data) {
      const { width, height } = data.info;
      const pixel = data.data;
      const s = encode(pixel, width, height).join("\n");
      console.log(s);
      fs.writeFileSync(outputPath, s);
      console.log("\noutput path: \n", outputPath);
    });
}

main();
