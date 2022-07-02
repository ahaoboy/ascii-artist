## install
```shell
npm i ascii-artist
```
[![minified](https://badgen.net/bundlephobia/min/ascii-artist)](https://badgen.net/bundlephobia/min/ascii-artist)
[![minified + gzip](https://badgen.net/bundlephobia/minzip/ascii-artist)](https://badgen.net/bundlephobia/minzip/ascii-artist)
[![dependency count](https://badgen.net/bundlephobia/dependency-count/ascii-artist)](https://badgen.net/bundlephobia/dependency-count/ascii-artist)
[![tree-shaking support](https://badgen.net/bundlephobia/tree-shaking/ascii-artist)](https://badgen.net/bundlephobia/tree-shaking/ascii-artist)
[![install size](https://packagephobia.com/badge?p=ascii-artist)](https://packagephobia.com/result?p=ascii-artist)


## demo
<div align="center">
	<a href="https://github.com/ahaoboy/ascii-artist">
		<img src="art.svg">
	</a>
</div>


## API
```ts
import {encode, decode} from 'ascii-artist'
const binary = to_threshold(rgba, width, height);
const data = encode(binary, width, height)
const str = data.join('\n')
const binary = decode(data, width, height)
```