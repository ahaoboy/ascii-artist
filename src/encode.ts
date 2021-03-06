import { toAscii } from "./share";

export const encode = (
  pixels: ArrayLike<number>,
  width: number,
  height: number
): string[] => {
  const w = Math.ceil(width / 2);
  const h = Math.ceil(height / 4);
  let data = [];
  for (let y = 0; y < h; y++) {
    let s = "";
    for (let x = 0; x < w; x++) {
      const _x = x << 1;
      const _y = y << 2;
      const block: [number, number][] = [];
      for (let offsetY = 0; offsetY < 4; offsetY++) {
        for (let offsetX = 0; offsetX < 2; offsetX++) {
          block.push([_x + offsetX, _y + offsetY]);
        }
      }
      let n = 0;
      block.forEach(([_x, _y], _p) => {
        if (_x >= width || _y >= height) return;
        if (pixels[_x + _y * width]) {
          n += 1 << _p;
        }
      });
      s += toAscii[n];
    }
    data.push(s);
  }
  return data;
};
