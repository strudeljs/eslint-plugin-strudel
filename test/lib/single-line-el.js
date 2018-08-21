'use strict';

const { expect } = require('chai');
const RuleTester = require('eslint').RuleTester;
const LinterConstructor = require('eslint').Linter;
const Linter = new LinterConstructor();

const commonParserConfig = require('../utils/common').commonParserConfig;
const defaultRuleFixer = require('../utils/common').defaultRuleFixer;
const rule = require('../../lib/rules/single-line-el');

require('babel-eslint');

describe('Single line el', () => {

  it('Correctly change decorated property place', () => {
    const sourceCode = `
        class TestClass {
            @El('selector') 
            property
        }
    `;

    const expectedOutput = `
        class TestClass {
            @El('selector') property
        }
    `;

    const fixer = defaultRuleFixer(sourceCode, rule, { 'single-line-el': "error" })
    debugger;

    expect(fixer.output).to.equal(expectedOutput);
    expect(fixer.fixed).to.be.true;
  })
  
  it('Does not change correct code', () => {
    const sourceCode = `
        class TestClass {
            @El('selector') property
        }
    `;

    const fixer = defaultRuleFixer(sourceCode, rule, { 'single-line-el': "error" })

    expect(fixer.output).to.equal(sourceCode);
    expect(fixer.fixed).to.be.false;
  })
})

const ruleTester = new RuleTester(commonParserConfig);

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
            property
        }
      `,
      errors: [{
        message: "Property should be in same line as El decorator",
        type: 'ClassProperty'
    }]
    }
  ]
});
