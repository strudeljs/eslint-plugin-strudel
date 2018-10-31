'use strict';

const RuleTester = require('eslint').RuleTester;
const rule = require('../../lib/rules/element-import');

// ------------------------------------------------
// Tests
// ------------------------------------------------

const ruleTester = new RuleTester(require('../utils/common').commonParserConfig);

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
      output: `
        import { element as $ } from "strudel";
      `,
      errors: [{
        message: `'El' should be imported as '$'.`,
        type: 'ImportSpecifier'
      }]
    }
  ]
});
