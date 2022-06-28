// @ts-check

// 스트림으로 큰 파일 처리

const fs = require('fs');

const ws = fs.createWriteStream('local/big_file');
const { log } = console;
// aaaaaabbbbbbbbbaaaaaaaabbbbb...aaaaaaabbbbbb
// 위와 같은 파일에서 a의 연속구간(a block)와 b의 연속 구간(b block)의 개수를 세는 프로그램

/**
 * @type {Object.<string, number>}
 */
const characterBlockCount = {
  a: 0,
  b: 0,
};

const NUM_MBYTES = 500;
for (let i = 0; i < NUM_MBYTES; i += 1) {
  const blockSize = Math.floor(800 + Math.random() * 200);
  const character = i % 2 === 0 ? 'a' : 'b';
  ws.write(character.repeat(1024 * blockSize));
  characterBlockCount[character] += 1;
}

// log(characterBlockCount);
