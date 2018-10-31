'use strict';

const { expect } = require('chai');
const RuleTester = require('eslint').RuleTester;

const commonParserConfig = require('../utils/common').commonParserConfig;
const defaultRuleFixer = require('../utils/common').defaultRuleFixer;
const rule = require('../../lib/rules/prefer-variable-selector');

require('babel-eslint');

const ruleTester = new RuleTester(commonParserConfig);

debugger;

ruleTester.run('single-line-el', rule, {
  valid: [
    {
      filename: 'test.js',
      code: `
        const selector = 'selector';

        class TestClass {
            @El(selector) property
        }
      `
    }
  ],
  invalid: [
    {
      filename: 'test.js',
      code: `
        class TestClass {
            @El('selector') property
        }
      `,
      errors: [{
        message: "@El decorator should be called with variable",
        type: 'ClassProperty'
    }]
    }
  ]
});
