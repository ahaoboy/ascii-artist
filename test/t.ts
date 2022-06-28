import { encode, decode } from "../src/index";

const data = [1, 1, 0, 0, 1, 1];
const w = 3;
const h = 2;
const s = encode(data, w, h);

console.log(s);

const a = decode(s, w, h);
console.log(a);
