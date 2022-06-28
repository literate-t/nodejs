const fs = require('fs');
const { log } = console;

/**
 *
 * @param {number} highWaterMark
 */
function processJson(highWaterMark) {
  const rs = fs.createReadStream('local/jsons', {
    encoding: 'utf-8',
    highWaterMark,
  });

  let totalSum = 0;
  let accumaltedStr = '';
  rs.on('data', (chunk) => {
    if (typeof chunk !== 'string') {
      return;
    }

    accumaltedStr += chunk;
    const lastNewLineIndex = accumaltedStr.lastIndexOf('\n');

    const jsonLinesStr = accumaltedStr.substring(0, lastNewLineIndex);
    accumaltedStr = accumaltedStr.substring(lastNewLineIndex);

    totalSum += jsonLinesStr
      .split('\n')
      .map((jsonLine) => {
        try {
          return JSON.parse(jsonLine);
        } catch {
          return undefined;
        }
      })
      .filter((json) => json)
      .map((json) => json.data)
      .reduce((result, current) => result + current, 0);
  });

  rs.on('end', () => {
    log('Event:end');
    log(`totalSum(highWaterMark:${highWaterMark})`, totalSum);
  });
}

for (let waterMark = 1; waterMark < 50; waterMark += 1) {
  processJson(waterMark);
}
