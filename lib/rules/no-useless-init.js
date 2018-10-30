'use strict';

const { hasCallableDecorator } = require('../helpers/helpers');

const ERROR_MESSAGE = 'No useless init function. Use @OnInit decorator instead';
const ERROR_DESCRIPTION = 'No useless init function';

module.exports = {
  meta: {
    docs: {
      description: ERROR_DESCRIPTION,
    },
  },
  create (context) {
    return {
      ClassDeclaration: (node) => {
        const hasComponentDecoratorCall = hasCallableDecorator(node, 'Component');

        const initMethod = node.body.body.find(classMethod => classMethod.key.name === 'init');

        if (!hasComponentDecoratorCall || !initMethod) return;

        const noVariableDeclaration = !initMethod.value.body.body.find(el => el.type === 'VariableDeclaration');

        noVariableDeclaration && context.report({
            node,
            message: ERROR_MESSAGE,
        });
      }
    }
  }
};

