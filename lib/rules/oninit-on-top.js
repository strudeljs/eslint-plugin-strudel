'use strict';

const { hasCallableDecorator, hasDecorator } = require('../helpers/helpers');

const ERROR_MESSAGE = "@OnInit must be on top of the class methods";

// const hasInitDecorator = (node) => 
  // Boolean(node.decorators && node.decorators.find(decorator => decorator.expression.name === "OnInit"))

const isInitMethod = (node) => 
  node.key.name === "init"

module.exports = {
  meta: {
    docs: {
      description: 'OnInit on top',
    },
  },
  create (context) {
    return { 
      ClassDeclaration: (node) => { 
        const hasComponentDecoratorCall = hasCallableDecorator(node, "Component");

        if (!hasComponentDecoratorCall) return;

        const indexedMethods = node.body.body
          .filter(bodyNode => bodyNode.type === "MethodDefinition")
          .map((method, index) => ({
            isInit: isInitMethod(method) || hasDecorator(method, "OnInit"),
            index
          }))
        
        const hasMisplacedInit = indexedMethods.reduce((accumulator, method) => {
          const isCorrectlyPlacedInit = method.isInit && accumulator.initBlock;

          if (accumulator.misplacedInit || isCorrectlyPlacedInit ) {
            return accumulator
          } else {
            const initNotInInitBlock = method.isInit && !accumulator.initBlock;

            return {
              initBlock: false,
              misplacedInit: initNotInInitBlock ? true : accumulator.misplacedInit
            }
          }
        }, { misplacedInit: false, initBlock: true })  

        hasMisplacedInit.misplacedInit && context.report({
          node,
          message: ERROR_MESSAGE,
        });
      }
    }
  }
};
