'use strict';

const { expect } = require('chai');
const RuleTester = require('eslint').RuleTester;

const commonParserConfig = require('../utils/common').commonParserConfig;
const rule = require('../../lib/rules/first-method-init');

require('babel-eslint');

const ruleTester = new RuleTester(commonParserConfig);

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
        message: "Init is not first method of class",
        type: 'ClassDeclaration'
      }]
    },
  ]
});
