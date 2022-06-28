import { toNumber } from "./share";

export const decode = (data: string[], width: number, height: number) => {
  const pixels = new Uint8ClampedArray(width * height);
  const w = Math.ceil(width / 2);
  const h = Math.ceil(height / 4);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const _x = x << 1;
      const _y = y << 2;
      const block: [number, number][] = [];
      for (let offsetY = 0; offsetY < 4; offsetY++) {
        for (let offsetX = 0; offsetX < 2; offsetX++) {
          block.push([_x + offsetX, _y + offsetY]);
        }
      }
      const n = toNumber[data[y]![x]!]!;
      block.forEach(([_x, _y], _p) => {
        if (_x >= width || _y >= height) return;
        const i = _x + _y * width;
        pixels[i] = (n >> _p) & 1;
      });
    }
  }
  return pixels;
};
