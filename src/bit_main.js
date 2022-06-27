// @ts-check

const { log } = console;
const buf = Buffer.from([23, 4, 1, 0]);

// LE: Little endian
// BE: Big endian
//log(buf.readInt32LE(1));

/**
 *
 * @param {*} array
 * @returns {number}
 */
function readInt32LE(array) {
  // prettier-ignore
  return (
        array[0] +
        array[1] * 256 +
        array[2] * 256 ** 2 +
        array[3] * 256 ** 3
    )
}
const offset = 0;

log('our function', readInt32LE(buf));
log('original function', buf.readInt32LE(offset));
