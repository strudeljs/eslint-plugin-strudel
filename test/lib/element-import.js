'use strict';

const { expect } = require('chai');
const RuleTester = require('eslint').RuleTester;
const LinterConstructor = require('eslint').Linter;
const Linter = new LinterConstructor();

const commonParserConfig = require('../utils/common').commonParserConfig;
const defaultRuleFixer = require('../utils/common').defaultRuleFixer;
const rule = require('../../lib/rules/element-import');

require('babel-eslint');

describe('Element import', () => {
  before(() => {
    Linter.defineRule('element-import', rule);
  })

  it('Correctly add import alias', () => {
    const sourceCode = "import { element } from 'strudel';";
    const expectedOutput = "import { element as $ } from 'strudel';";

    const fixer = defaultRuleFixer(sourceCode, rule, { 'element-import': "error" });

    expect(fixer.output).to.equal(expectedOutput);
    expect(fixer.fixed).to.be.true;
  })
  
  it('Does not change correct code', () => {
    const sourceCode = "import { element as $ } from 'strudel';";

    const fixer = defaultRuleFixer(sourceCode, rule, { 'element-import': "error" });

    expect(fixer.output).to.equal(sourceCode);
    expect(fixer.fixed).to.be.false;
  })
})

const ruleTester = new RuleTester(commonParserConfig);

ruleTester.run('element-import', rule, {
  valid: [
    {
      filename: 'test.js',
      code: `
        import { element as $ } from "strudel";
        import { $ } from "strudel";
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
