'use strict';

const { hasCallableDecorator } = require('../helpers/helpers');

const ERROR_MESSAGE = "Init is not first method of class";
const ERROR_DESCRIPTON = "Init must be first method of class";

module.exports = {
  meta: {
    docs: {
      description: ERROR_DESCRIPTON,
    },
  },
  create (context) {
    return { 
      ClassDeclaration: (node) => { 
        const hasComponentDecoratorCall = hasCallableDecorator(node, "Component");

        if (!hasComponentDecoratorCall) return;

        const initIndex = node.body.body
          .filter(bodyNode => bodyNode.type === "MethodDefinition")
          .findIndex(el => el.key.name === "init");

        initIndex > 0 && context.report({
            node,
            message: ERROR_MESSAGE,
        });
      }
    }
  }
};
