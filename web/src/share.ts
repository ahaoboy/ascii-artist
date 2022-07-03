import { store } from "./store";
import { init, toGray, toThreshold } from "adaptive-threshold-wasm";
import { encode } from "ascii-artist";

export const updateImage = async (url: string) => {
  await init();
  const data = await getImageData(url);
  const g = toGray(data.rgba, data.width, data.height);
  const th = toThreshold(
    g,
    data.width,
    data.height,
    store.maxValue,
    store.adaptiveMethod,
    store.thresholdType,
    store.blockSize,
    store.C
  );
  const ascii = encode(th, data.width, data.height).join("\n");
  return new Promise<void>((r) =>
    setTimeout(async () => {
      const pre = document.getElementById("hide-pre")!;
      const img = document.getElementById("img")! as HTMLImageElement;
      img.src = url;
      const cb = () => {
        pre.innerText = ascii;
        const imgWidth = parseFloat(getComputedStyle(img).width);
        const preWidth = parseFloat(getComputedStyle(pre).width);
        console.log(imgWidth, preWidth);
        const imgH = parseFloat(getComputedStyle(img).height);
        const preH = parseFloat(getComputedStyle(pre).height);
        const scaleW = imgWidth / preWidth;
        const scaleH = imgH / preH;
        console.log({ scaleW, scaleH, imgWidth, preWidth, imgH, preH });
        store.textScale = Math.min(scaleH, scaleW);
        Object.assign(store, data);
        pre.innerText = ""
        img.removeEventListener('load',cb)
        r()
      };
      if (!img.complete) {
        img.addEventListener("load", cb);
      } else {
        cb();
      }
    })
  );
};
export const getImageData = (
  url: string
): Promise<{
  width: number;
  height: number;
  rgba: Uint8ClampedArray;
  url: string;
}> => {
  const img = document.createElement("img");
  img.src = url;
  return new Promise((r) => {
    img.onload = () => {
      const { width, height } = img;
      const c = document.createElement("canvas");
      const ctx = c.getContext("2d")!;
      c.width = width;
      c.height = height;
      ctx.drawImage(img, 0, 0);
      const rgba = ctx.getImageData(0, 0, width, height).data;
      r({ width, height, rgba, url });
    };
  });
};
