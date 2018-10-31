'use strict';
const { findNodeCallableDecorator } = require('../helpers/helpers');

const ERROR_DESCRIPTION = "@El decorator should be called with variable";

module.exports = {
  meta: {
    docs: {
      description: ERROR_DESCRIPTION,
    },
  },
  create (context) {
    return { 
      ClassProperty: (node) => { 
        const decoratorCall = findNodeCallableDecorator(node, "El");

        if (!decoratorCall) return

        debugger;

        const isNodeCorrect = Boolean(decoratorCall
          .expression
          .arguments
          .find(argument => argument.type === "Identifier")
        )

        !isNodeCorrect && context.report({
            node,
            message: ERROR_DESCRIPTION,
        });
      }
    }
  }
};

