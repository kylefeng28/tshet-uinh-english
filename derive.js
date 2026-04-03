import fs from 'fs';
import TshetUinhEnglish from './tshet-uinh-english';
import { 推導方案 } from 'tshet-uinh-deriver-tools';

// See https://github.com/nk2028/tshet-uinh-autoderiver/blob/main/src/evaluate.ts
// and https://github.com/nk2028/tshet-uinh-autoderiver/blob/main/src/options.tsx

function rawDeriverFrom(deriverSource) {
    return new Function('options', 'yinyunPosition', 'headword', deriverSource); // args: 選項, 音韻地位, 字頭
}

if (process.argv.length < 3) {
    throw new Error(`usage: ${process.argv[0]} <deriver-script> <input>`)
}

const deriverScriptFile = process.argv[2];
let input = process.argv[3];

// Try to read input as a file if exists, otherwise treat as a regular string
try {
	if (fs.statSync(input).isFile()) {
		input = fs.readFileSync(input, 'utf8');
	}
} catch (e) {}

const deriverSource = fs.readFileSync(deriverScriptFile, 'utf8');
const rawDeriver = rawDeriverFrom(deriverSource)

const schema = new 推導方案(rawDeriver)
const options = {};

function callDeriver(yinyunPosition, headword) {
    return schema(options)(yinyunPosition, headword);
}

for (const headword of input) {
	const result = [];
	for (const entry of TshetUinhEnglish.resources.queryHeadword(headword)) {
		const { yinyunPosition } = entry;
		const derivedSound = callDeriver(yinyunPosition, headword);
		result.push(derivedSound);
	}
	if (result.length > 0) {
	  console.log([headword, result])
	}
}
