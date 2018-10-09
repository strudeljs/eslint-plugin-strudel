'use strict';

const ERROR_MESSAGE = "Element should be imported as $";
const ERROR_DESCRIPTION = "Element not imported as $";

module.exports = {
  meta: {
    docs: {
      description: ERROR_DESCRIPTION,
    },
    fixable: "code",
  },
  create (context) {
    return { 
      ImportSpecifier: (node) => { 
        const isNodeIncorrect = node.imported.name === "element" && node.local.name !== "$";

        isNodeIncorrect && context.report({
            node,
            message: ERROR_MESSAGE,
            fix: (fixer) => fixer.insertTextAfter(node, ' as $'),
        });
      }
    }
  }
};

