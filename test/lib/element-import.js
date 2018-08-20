'use strict';

const rule = require('../../lib/rules/element-import');
const { expect } = require('chai');
const RuleTester = require('eslint').RuleTester;
const LinterConstructor = require('eslint').Linter;
const Linter = new LinterConstructor();

require('babel-eslint');

const commonParserConfig = { 
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module'
  } 
};

describe('Fixer', () => {
  before(() => {
    Linter.defineRule('element-import', rule);
  })

  it('Correctly add import alias', () => {
    const sourceCode = "import { element } from 'strudel';";

    const eslintOutput = Linter.verifyAndFix(sourceCode, {
      rules: { 'element-import': "error" },  
      ...commonParserConfig
    }, { 
      fix: true
    });

    expect(eslintOutput.output).to.include('element as $');
    expect(eslintOutput.fixed).to.be.true;
  })
  
  it('Does not change correct code', () => {
    const sourceCode = "import { element as $ } from 'strudel';";

    const eslintOutput = Linter.verifyAndFix(sourceCode, {
      rules: { 'element-import': "error" },  
      ...commonParserConfig
    }, { 
      fix: true
    });

    expect(eslintOutput.output).to.equal(sourceCode);
    expect(eslintOutput.fixed).to.be.false;
  })
})

const ruleTester = new RuleTester(commonParserConfig);

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
