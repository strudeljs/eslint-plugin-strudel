'use strict';

const RuleTester = require('eslint').RuleTester;
const rule = require('../../lib/rules/first-method-init');

// ------------------------------------------------
// Tests
// ------------------------------------------------

const ruleTester = new RuleTester(require('../utils/common').commonParserConfig);

ruleTester.run('first-method-init', rule, {
  valid: [
    {
      filename: 'test.js',
      code: `
        @Component('test')
        class Test {
          @El('.selector') $property
          init() { }
        }
      `
    },
    {
      filename: 'test.js',
      code: `
        @Component('test')
        class Test {
          property = 10

          init() { }
        }
      `
    },
    {
      filename: 'test.js',
      code: `
        @Component('test')
        class Test {
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
          render() {}

          init() {}
        }
      `,
      errors: [{
        message: `'init' is not first method of class.`,
        type: 'ClassDeclaration'
      }]
    },
  ]
});
