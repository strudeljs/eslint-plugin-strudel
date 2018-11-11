'use strict';

const { hasCallableDecorator } = require('../helpers/helpers');

const create = (context) => {
  return {
    ClassDeclaration: (node) => {
      const hasComponentDecoratorCall = hasCallableDecorator(node, 'Component');

      const initMethod = node.body.body.find(classMethod => classMethod.key.name === 'init');

      if (!hasComponentDecoratorCall || !initMethod) return;

      const noVariableDeclaration = !initMethod.value.body.body.find(el => el.type === 'VariableDeclaration');

      noVariableDeclaration && context.report({
          node,
          message: `No useless init function. Use '@OnInit' decorator instead.`,
      });
    }
  }
}

module.exports = {
  meta: {
    docs: {
      description: 'no useless init function',
      category: 'recommended',
      docs: 'https://github.com/strudeljs/eslint-plugin-strudel/blob/master/docs/rules/no-useless-init.md'
    },
  },
  create
};
