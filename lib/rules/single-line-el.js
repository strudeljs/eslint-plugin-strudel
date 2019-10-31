'use strict';
const { findNodeCallableDecorator } = require('../helpers/helpers');

const ERROR_MESSAGE = (propertyName) => `${propertyName} should be in same line as El decorator`;
const ERROR_DESCRIPTION = "Property not in same line as El decorator";

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
        const decoratorCall = findNodeCallableDecorator(node, "El");

        const maxLineLength = context.options[0] || 100;
        const willExceedLineLimit = (node.end - node.start) + (node.loc.start.column * 4) > maxLineLength;

        if (!decoratorCall || willExceedLineLimit) return

        const elDecoratorLine = decoratorCall.loc.start.line;
        const elDecoratorEnd = decoratorCall.end;

        const propertyLine = node.key.loc.start.line;
        const propertyStart = node.key.start;
        const propertyName = node.key.name;

        const isNodeIncorrect = elDecoratorLine !== propertyLine;

        isNodeIncorrect && context.report({
            node,
            message: ERROR_MESSAGE(propertyName),
            fix: (fixer) => { 
                return fixer.removeRange([elDecoratorEnd, propertyStart - 1]) 
            },
        });
      }
    }
  }
};

