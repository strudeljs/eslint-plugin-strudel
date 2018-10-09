'use strict';

const { hasCallableDecorator } = require('../helpers/helpers');

const ERROR_MESSAGE = "Element decorator not on top of class";
const ERROR_DESCRIPTION = "Element decorator on top";

module.exports = {
  meta: {
    docs: {
      description: ERROR_DESCRIPTION,
    },
  },
  create (context) {
    return { 
      ClassDeclaration: (node) => { 
        const hasComponentDecoratorCall = hasCallableDecorator(node, "Component");

        if (!hasComponentDecoratorCall) return;

        const indexedMethods = node.body.body
          .map((method, index) => ({
            isElement: hasCallableDecorator(method, 'El'),
            index
          }))

        const hasMisplacedEl = indexedMethods.reduce((accumulator, method) => {
          const isCorrectlyPlacedInit = method.isElement && accumulator.elementBlock;

          if (accumulator.misplacedInit || isCorrectlyPlacedInit ) {
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
          message: ERROR_MESSAGE,
        });
      }
    }
  }
};
