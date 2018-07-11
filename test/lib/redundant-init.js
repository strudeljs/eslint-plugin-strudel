const rule = require('../../lib/rules/redundant-init');
const RuleTester = require('eslint').RuleTester;

const parserOptions = {
  ecmaVersion: 2015,
  sourceType: 'module'
};

const ruleTester = new RuleTester();
ruleTester.run('redundant-init', rule, {
  valid: [
    {
      filename: 'test.js',
      code: `
        new Vue({
          data: function () {
            return {
              foo: 'bar'
            }
          }
        })
      `,
      parserOptions
    }
  ],
  invalid: [
    {
      filename: 'test.js',
      code: `
        new Vue({
          data: function () {
            return {
              foo: 'bar'
            }
          }
        })
      `,
      parserOptions
    }
  ]
});
