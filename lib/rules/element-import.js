'use strict';

const ERROR_MESSAGE = "Element should be imported as $";

module.exports = {
  meta: {
    docs: {
      description: 'Element not imported as $',
    },
    fixable: null
  },
  create (context) {
    return { 
      ImportSpecifier: (node) => { 
        debugger;
        const isNodeIncorrect = node.imported.name === "element" && node.local.name !== "$";

        isNodeIncorrect && context.report({
            node,
            message: ERROR_MESSAGE,
        })
      }
    }
  }
};

