'use strict';

module.exports = {
  rules: {
    'no-useless-init': require('./rules/no-useless-init'),
    'first-method-init': require('./rules/first-method-init'),
    'element-on-top': require('./rules/element-on-top'),
    'oninit-on-top': require('./rules/oninit-on-top'),
    'element-import': require('./rules/element-import'),
    'single-line-el': require('./rules/single-line-el')
  },
  configs: {
    'base': require('./configs/base'),
    'recommended': require('./configs/recommended'),
  }
};
