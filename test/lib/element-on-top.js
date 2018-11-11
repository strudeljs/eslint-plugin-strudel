'use strict';

const RuleTester = require('eslint').RuleTester;
const rule = require('../../lib/rules/element-on-top');

// ------------------------------------------------
// Tests
// ------------------------------------------------

const ruleTester = new RuleTester(require('../utils/common').commonParserConfig);

ruleTester.run('el-on-top', rule, {
  valid: [
    {
      filename: 'test.js',
      code: `
        @Component('test')
        class Test {
          @El('.selector') property
          @El('.selector2') property2

          init() {}
        }
      `
    },
  ],
  invalid: [
    {
      filename: 'test.js',
      code: `
        @Component('asdf')
        class Test {
          init() {}

          @El('selector') property
        }
      `,
      errors: [{
        message: `'El' decorator not on top of class.`,
        type: 'ClassDeclaration'
      }]
    }
  ]
});
