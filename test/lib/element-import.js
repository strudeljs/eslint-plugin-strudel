'use strict';

const rule = require('../../lib/rules/element-import');
const RuleTester = require('eslint').RuleTester;

require('babel-eslint');

const ruleTester = new RuleTester({
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module'
  }
});

ruleTester.run('element-import', rule, {
  valid: [
    {
      filename: 'test.js',
      code: `
        import { element as $ } from "strudel";
      `
    }
  ],
  invalid: [
    {
      filename: 'test.js',
      code: `
        import { element } from "strudel";
      `,
      errors: [{
        message: "Element should be imported as $",
        type: 'ImportSpecifier'
    }]
    }
  ]
});
