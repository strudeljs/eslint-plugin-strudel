const findNodeCallableDecorator = (node, decorator) =>
  node.decorators &&
  node.decorators.find(
    el => el.expression.callee && el.expression.callee.name === decorator
  );

const findNodeDecorator = (node, decorator) =>
  node.decorators &&
  node.decorators.find(el => el.expression.name === decorator);

const hasCallableDecorator = (node, decorator) =>
  Boolean(findNodeCallableDecorator(node, decorator));

const hasDecorator = (node, decorator) =>
  Boolean(findNodeDecorator(node, decorator));

module.exports = {
    findNodeCallableDecorator,
    findNodeDecorator,
    hasCallableDecorator,
    hasDecorator,
}
