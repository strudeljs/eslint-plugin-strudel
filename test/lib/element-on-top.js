'use strict';

const { expect } = require('chai');
const RuleTester = require('eslint').RuleTester;

const commonParserConfig = require('../utils/common').commonParserConfig;
const rule = require('../../lib/rules/element-on-top');

require('babel-eslint');

const ruleTester = new RuleTester(commonParserConfig);

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
        message: "Element decorator not on top of class",
        type: 'ClassDeclaration'
    }]
    }
  ]
});
