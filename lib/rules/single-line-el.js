'use strict';
const { findNodeCallableDecorator } = require('../helpers/helpers');

const create = (context) => {
  return {
    ClassProperty: (node) => {
      const decoratorCall = findNodeCallableDecorator(node, 'El');

      if (!decoratorCall) return

      const elDecoratorLine = decoratorCall.loc.start.line;
      const elDecoratorEnd = decoratorCall.end;

      const propertyLine = node.key.loc.start.line;
      const propertyStart = node.key.start;
      const propertyName = node.key.name;

      const isNodeIncorrect = elDecoratorLine !== propertyLine;

      isNodeIncorrect && context.report({
          node,
          message: '"{{propertyName}}" should be in same line as "El" decorator',
          data: {
            propertyName
          },
          fix: (fixer) => {
              return fixer.removeRange([elDecoratorEnd, propertyStart - 1])
          },
      });
    }
  }
}

module.exports = {
  meta: {
    docs: {
      description: 'property not in same line as El decorator',
      category: 'recommended',
      docs: 'https://github.com/strudeljs/eslint-plugin-strudel/blob/master/docs/rules/single-line-el.md'
    },
    fixable: 'code',
  },
  create
};

