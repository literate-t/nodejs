// @ts-check

const fs = require('fs');

const rs = fs.createReadStream('local/big_file', {
  encoding: 'utf-8',
  //highWaterMark: 65536 // default 청크 사이즈 조절
});

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

/** @type {number} */
let chunkCount = 0;
// everytime it reads
// rs.on('data', (data) => {
//   dataCount += 1;
// });
console.time('time_measure');
rs.on('data', (data) => {
  // default data is Buffer
  chunkCount += 1;
  if (typeof data !== 'string') {
    return;
  }
  for (let i = 0; i < data.length; i += 1) {
    const character = data[i];
    if (!character) continue;
    if (prevChar !== character) {
      prevChar = character;
      characterBlockCount[character] += 1;
    }
  }
});

rs.on('error', () => {
  log('Event:error');
});
// when it ends
rs.on('end', () => {
  console.timeEnd('time_measure');
  log('blockCount', characterBlockCount);
});
