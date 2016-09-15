'use strict';

const appendKeyValue = (o, k, v) => !(v === null || v === undefined) && (o[k] = v) && o || o;

const toCamelCase = (str, glue) =>
  str.split(glue || '_')
    .map((chunk, i) => (i === 0)
      ? chunk
      : chunk.charAt(0).toUpperCase() + chunk.slice(1))
    .join('');

const parseArgs = (arr) => arr
  .map(param => param.split('='))
  .map(param => (param.length === 2)
    ? param
    : param.concat([true]))
  .reduce((o, param) => appendKeyValue(
    o, toCamelCase(param[0].replace('--', ''), '-'), param[1]
  ), {});

module.exports = {
  appendKeyValue,
  parseArgs,
  toCamelCase
};
