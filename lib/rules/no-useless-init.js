'use strict';

const ERROR_MESSAGE = "No useless init function. Use @OnInit decorator instead";

module.exports = {
  meta: {
    docs: {
      description: 'No useless init function',
    },
    fixable: false,
  },
  create (context) {
    return { 
      ClassDeclaration: (node) => { 
        const hasComponentDecoratorCall = !!node.decorators && node.decorators.find(el => el.expression.callee.name === "Component");

        const initMethod = node.body.body.find(classMethod => classMethod.key.name === "init");

        if (!hasComponentDecoratorCall || !initMethod) return;

        const noVariableDeclaration = !initMethod.value.body.body.find(el => el.type === "VariableDeclaration");

        noVariableDeclaration && context.report({
            node,
            message: ERROR_MESSAGE,
        });
      }
    }
  }
};

