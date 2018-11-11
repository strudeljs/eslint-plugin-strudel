'use strict';

module.exports = {
  plugins: ['strudel'],
  env: {
    browser: true,
    jasmine: true,
    es6: true
  },
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    parserOptions: {
      ecmaVersion: 7,
      sourceType: 'module'
    }
  }
};
