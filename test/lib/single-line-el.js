'use strict';

const RuleTester = require('eslint').RuleTester;
const rule = require('../../lib/rules/single-line-el');

// ------------------------------------------------
// Tests
// ------------------------------------------------

const ruleTester = new RuleTester(require('../utils/common').commonParserConfig);

ruleTester.run('single-line-el', rule, {
  valid: [
    {
      filename: 'test.js',
      code: `
        class TestClass {
          @El('selector') property
        }
      `
    }
  ],
  invalid: [
    {
      filename: 'test.js',
      code: `
        class TestClass {
          @El('selector')
          decoratedProperty
        }
      `,
      output: `
        class TestClass {
          @El('selector') decoratedProperty
        }
      `,
      errors: [{
        message: `'decoratedProperty' should be in same line as 'El' decorator`,
        type: 'ClassProperty'
      }]
    }
  ]
});
