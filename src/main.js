// const decamelize = (text, separator = '_') => {
//   const replacement = `$1${separator}$2`;
//   return text
//     .replace(/([\p{Lowercase_Letter}\d])(\p{Uppercase_Letter})/gu, replacement)
//     .toLowerCase();
// };

// const result = decamelize('javaScript');
// console.log(result);

// /**
//  * 정규표현식에서 각 capture group을 $1, $2로 표현
//  */

// var re = /(\w+)\s(\w+)/;
// var str = 'John Smith';
// const strr = str.replace(re, '$2, $1'); // "Smith, John"
// console.log(strr);

const { log } = console;

// 전부 다른 객체를 가져온다
// 문제
const a = require('./Module');
const b = require('./mOdule');
const c = require('./moDule');
log(a, b);
log(a === b, b === c, c === a);
