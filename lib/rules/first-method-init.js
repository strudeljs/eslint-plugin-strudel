'use strict';

const ERROR_MESSAGE = "Init is not first method of class";

module.exports = {
  meta: {
    docs: {
      description: 'Init must be first method of class',
    },
  },
  create (context) {
    return { 
      ClassDeclaration: (node) => { 
        const hasComponentDecoratorCall = !!node.decorators && node.decorators.find(el => el.expression.callee.name === "Component");

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
