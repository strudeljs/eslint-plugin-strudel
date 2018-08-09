'use strict';

module.exports = {
  meta: {
    docs: {
      description: 'redundant init',
    },
    fixable: null
  },
  create (context) {
    function visitMember(node) {
      if (node.key.name === 'init') {
        console.log(node.value.body);
      }
    }

    return {
      MethodDefinition: visitMember,
    };
  }
}
