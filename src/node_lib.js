// @ts-check

// const os = require('os');

// console.log(
//   ['arch', os.arch()],
//   ['platforms', os.platform()],
//   ['cpus', os.cpus()]
// );

const path = require('path');
const fs = require('fs');

const filePath = path.resolve(__dirname, './test');
//const content = fs.readFileSync('./test', 'utf-8'); // 실행 위치에 따라 상대경로 파일을 못 찾음
const content = fs.readFileSync(filePath, 'utf-8');
console.log(content);
