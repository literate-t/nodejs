// @ts-check

const fs = require('fs');
const bufFromFile = fs.readFileSync('src/test');

// const buf = Buffer.from([97, 98, 99, 100, 101, 102]);
// console.log(buf, bufFromFile);
// console.log(buf.compare(bufFromFile));

// const sorted = [11, 2, 22, 1].sort((a, b) => a - b);
// console.log(sorted);

// const bufA = Buffer.from([0]);
// const bufB = Buffer.from([3]);
// const bufC = Buffer.from([2]);
// const bufD = Buffer.from([6]);
// const bufs = [bufA, bufB, bufC, bufD];
// bufs.sort(Buffer.compare);
//bufs.sort((a,b)=> a.comapre(b))

const { log } = console;
// const buf = Buffer.from('abcde');
// log(buf);
const buf = Buffer.from([0, 1, 2, 3]);
log(Buffer.isBuffer(buf));
