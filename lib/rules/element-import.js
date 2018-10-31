'use strict';

const create = (context) => {
  return {
    ImportSpecifier: (node) => {
      const isNodeIncorrect = node.imported.name === 'element' && node.local.name !== '$';

      isNodeIncorrect && context.report({
          node,
          message: `'El' should be imported as '$'.`,
          fix: (fixer) => fixer.insertTextAfter(node, ' as $'),
      });
    }
  }
}

module.exports = {
  meta: {
    docs: {
      description: 'element not imported as $',
      category: 'recommended',
      docs: 'https://github.com/strudeljs/eslint-plugin-strudel/blob/master/docs/rules/element-import.md'
    },
    fixable: 'code',
  },
  create
};
