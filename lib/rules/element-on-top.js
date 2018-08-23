'use strict';

const ERROR_MESSAGE = "Element decorator not on top of class";

const hasElementDecorator = (node) => 
  Boolean(node.decorators && node.decorators.find(decorator => decorator.expression.callee.name === "El"))

module.exports = {
  meta: {
    docs: {
      description: 'Element decorator on top',
    },
  },
  create (context) {
    return { 
      ClassDeclaration: (node) => { 
        const hasComponentDecoratorCall = !!node.decorators && node.decorators.find(el => el.expression.callee.name === "Component");

        if (!hasComponentDecoratorCall) return;

        const indexedMethods = node.body.body
          .map((method, index) => ({
            isElement: hasElementDecorator(method),
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

        debugger;

        hasMisplacedEl.misplacedElement && context.report({
          node,
          message: ERROR_MESSAGE,
        });
      }
    }
  }
};
