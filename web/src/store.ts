import { defineStore } from "binia";
import { encode } from "ascii-artist";
import { toGray, toThreshold } from "adaptive-threshold-wasm";

export const store = defineStore({
  state: {
    rgba: new Uint8ClampedArray(),
    width: 0,
    height: 0,
    maxValue: 255,
    adaptiveMethod: 0,
    thresholdType: 0,
    blockSize: 5,
    C: 3,
    url: "",
    imageDomWidth: 0,
    textDomWidth: 0,
    textScale: 1,
  },
  computed: {
    ascii() {
      if (!(this.width && this.height && this.rgba.length && this.url))
        return "";
      const g = toGray(this.rgba, this.width, this.height);
      const th = toThreshold(
        g,
        this.width,
        this.height,
        this.maxValue,
        this.adaptiveMethod,
        this.thresholdType,
        this.blockSize,
        this.C
      );
      const s = encode(th, this.width, this.height).join("\n");
      return s;
    },
  },
});
