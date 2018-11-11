'use strict';

const RuleTester = require('eslint').RuleTester;
const rule = require('../../lib/rules/oninit-on-top');

// ------------------------------------------------
// Tests
// ------------------------------------------------

const ruleTester = new RuleTester(require('../utils/common').commonParserConfig);

ruleTester.run('oninit-on-top', rule, {
  valid: [
    {
      filename: 'test.js',
      code: `
        @Component('test')
        class Test {
          @OnInit
          render() {}

          method() {}
        }
      `
    },
    {
      filename: 'test.js',
      code: `
        @Component('test')
        class Test {
          init() {}

          @OnInit
          render() {}
        }
      `
    }
  ],
  invalid: [
    {
      filename: 'test.js',
      code: `
        @Component('asdf')
        class Test {
          method() {}

          @OnInit
          render() {}
        }
      `,
      errors: [{
        message: `'@OnInit' must be on top of the class methods.`,
        type: 'ClassDeclaration'
      }]
    },
  ]
});
