'use strict';

const RuleTester = require('eslint').RuleTester;

const commonParserConfig = require('../utils/common').commonParserConfig;
const rule = require('../../lib/rules/no-useless-init');

require('babel-eslint');

const ruleTester = new RuleTester(commonParserConfig);

ruleTester.run('no-useless-init', rule, {
  valid: [
    {
      filename: 'test.js',
      code: `
        @Component('test')
        class Test {
            init() {
                const props = this.$data.props;
                this.render();
            }
        }
      `
    }
  ],
  invalid: [
    {
      filename: 'test.js',
      code: `
        @Component('test-component')
        class Test {
            init() {
                this.render();
            }
        }
      `,
      errors: [{
        message: 'No useless init function. Use @OnInit decorator instead',
        type: 'ClassDeclaration'
    }]
    },
    {
      filename: 'test.js',
      code: `
        @Component('test-component')
        class Test {
            init() {}
        }
      `,
      errors: [{
        message: 'No useless init function. Use @OnInit decorator instead',
        type: 'ClassDeclaration'
    }]
    }
  ]
});
