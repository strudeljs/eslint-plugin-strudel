'use strict';

const ERROR_MESSAGE = "Property should be in same line as El decorator";

module.exports = {
  meta: {
    docs: {
      description: 'Property not in same line as El decorator',
    },
    fixable: "code",
  },
  create (context) {
    return { 
      ClassProperty: (node) => { 
        const decoratorCall = node.decorators && node.decorators.find(el => el.expression.callee.name = "El");

        if (!decoratorCall) return

        const elDecoratorLine = decoratorCall.loc.start.line;
        const elDecoratorEnd = decoratorCall.end;

        const propertyLine = node.key.loc.start.line;
        const propertyStart = node.key.start;

        const isNodeIncorrect = elDecoratorLine !== propertyLine;

        isNodeIncorrect && context.report({
            node,
            message: ERROR_MESSAGE,
            fix: (fixer) => { 
                return fixer.removeRange([elDecoratorEnd, propertyStart - 1]) 
            },
        });
      }
    }
  }
};

