module.exports = {
    extends: [
        './base.js'
    ].map(require.resolve),
    rules: {
        'strudel/no-useless-init': 'error',
        'strudel/first-method-init': 'error',
        'strudel/element-on-top': 'error',
        'strudel/oninit-on-top': 'error',
        'strudel/element-import': 'error',
        'strudel/single-line-el': 'error',
        'strudel/prefer-variable-selector': 'error',
    },
}
