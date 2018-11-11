'use strict';

const { hasCallableDecorator } = require('../helpers/helpers');

const create = (context) => {
  return {
    ClassDeclaration: (node) => {
      const hasComponentDecoratorCall = hasCallableDecorator(node, 'Component');

      if (!hasComponentDecoratorCall) return;

      const initIndex = node.body.body
        .filter(bodyNode => bodyNode.type === 'MethodDefinition')
        .findIndex(el => el.key.name === 'init');

      initIndex > 0 && context.report({
          node,
          message: `'init' is not first method of class.`,
      });
    }
  }
}

module.exports = {
  meta: {
    docs: {
      description: 'init must be first method of class',
      category: 'recommended',
      docs: 'https://github.com/strudeljs/eslint-plugin-strudel/blob/master/docs/rules/first-method-init.md'
    },
  },
  create
};
