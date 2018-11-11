'use strict';

const { hasCallableDecorator } = require('../helpers/helpers');

const create = (context) => {
  return {
    ClassDeclaration: (node) => {
      const hasComponentDecoratorCall = hasCallableDecorator(node, 'Component');

      if (!hasComponentDecoratorCall) return;

      const indexedMethods = node.body.body
        .map((method, index) => ({
          isElement: hasCallableDecorator(method, 'El'),
          index
        }))

      const hasMisplacedEl = indexedMethods.reduce((accumulator, method) => {
        const isCorrectlyPlacedInit = method.isElement && accumulator.elementBlock;

        if (accumulator.misplacedInit || isCorrectlyPlacedInit) {
          return accumulator
        } else {
          const initNotInelementBlock = method.isElement && !accumulator.elementBlock;

          return {
            elementBlock: false,
            misplacedElement: initNotInelementBlock ? true : accumulator.misplacedInit
          }
        }
      }, { misplacedElement: false, elementBlock: true })

      hasMisplacedEl.misplacedElement && context.report({
        node,
        message: `'El' decorator not on top of class.`,
      });
    }
  }
}

module.exports = {
  meta: {
    docs: {
      description: 'element decorator on top',
      category: 'recommended',
      docs: 'https://github.com/strudeljs/eslint-plugin-strudel/blob/master/docs/rules/element-on-top.md'
    },
  },
  create
};
