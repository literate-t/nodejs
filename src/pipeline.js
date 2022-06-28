// @ts-check

const fs = require('fs');
const stream = require('stream');
const zlib = require('zlib');
const util = require('util');

//const { log, error } = console;
// stream.pipeline(
//   fs.createReadStream('local/big_file'),
//   zlib.createGzip(),
//   fs.createWriteStream('local/big_file.gz'),
//   (err) => {
//     if (err) {
//       error('Gzip failed', err);
//     } else {
//       log('Gzip succeeded');

//       stream.pipeline(
//         fs.createReadStream('local/big_file.gz'),
//         zlib.createGunzip(),
//         fs.createWriteStream('local/big_file.unzipped'),
//         (_err) => {
//           if (_err) {
//             error('Gunzip failed', _err);
//           } else {
//             log('Gunzip succeeded');
//           }
//         }
//       );
//     }
//   }
// );

async function gzip() {
  return util.promisify(stream.pipeline)(
    fs.createReadStream('local/big_file'),
    zlib.createGzip(),
    fs.createWriteStream('local/big_file.gz')
  );
}

async function gunzip() {
  return util.promisify(stream.pipeline)(
    fs.createReadStream('local/big_file.gz'),
    zlib.createGunzip(),
    fs.createWriteStream('local/big_file.unzipped')
  );
}

async function main() {
  await gzip();
  await gunzip();
}

main();
