// @ts-check

const fs = require('fs');

// 스트림을 만들어
const stream = fs.createReadStream('src/test');
// 표준출력에 넣는다
stream.pipe(process.stdout);
// 흘러가는 거라고 추상적으로 생각해도 됨
// 따라서 램이 모든 데이터를 들고 있지 않아도 됨
