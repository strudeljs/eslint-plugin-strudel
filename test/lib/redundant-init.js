'use strict';

const rule = require('../../lib/rules/redundant-init');
const RuleTester = require('eslint').RuleTester;

require('babel-eslint');

const ruleTester = new RuleTester({
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module'
  }
});

ruleTester.run('redundant-init', rule, {
  valid: [
    {
      filename: 'test.js',
      code: `
        @Component('.asdf')
        class Test {
           a() { }
           b() { }

           init() {
             this.a();
             this.b();
           }
        }
      `
    }
  ],
  invalid: [
    {
      filename: 'test.js',
      code: `
        @Component('.asdf')
        class Test {
          init() {
            this.b();
          }
        }
      `
    }
  ]
});
