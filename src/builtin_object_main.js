// @ts-check

const { log } = console;

/** __dirname, __filename */
// log('__dirname', __dirname);
// log('__filename', __filename);

/** process */
// process.stdin.setEncoding('utf-8');
// process.stdin.on('data', (data) => {
//   log(data, data.length);
// });
//process.stdin.pipe(process.stdout);

/** setInterval */
let count = 0;
const handle = setInterval(() => {
  log('Interval');
  count += 1;
  if (4 <= count) {
    log('done');
    clearInterval(handle);
  }
}, 1000);
