const decamelized = (text, separator = '_') => {
  const replacement = `$1${separator}$2`;
  return text.replace(
    /([\p{Lowercase_Letter}\d])(\p{Uppercase_Letter})/gu,
    replacement
  );
};

const result = decamelized('rainbowUnicorn');
console.log(result);

/**
 * 정규표현식에서 각 capture group을 $1, $2로 표현
 */
