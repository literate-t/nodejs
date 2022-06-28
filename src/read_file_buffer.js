// @ts-check

const fs = require('fs');

// 파일을 통째로 메모리에 올림
const data = fs.readFileSync('local/big_file', 'utf-8');

const { log } = console;

/**
 * @type {Object.<string, number>}
 */
const characterBlockCount = {
  a: 0,
  b: 0,
};

/** @type {string | undefined} */
let prevChar = '';
console.time('code_measure');
for (let i = 0; i < data.length; i += 1) {
  const character = data[i];
  if (!character) continue;
  if (prevChar !== character) {
    prevChar = character;
    characterBlockCount[character] += 1;
  }
}
console.timeEnd('code_measure');
log('blockCount', characterBlockCount);
