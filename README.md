# eslint-plugin-strudel

<p>
<a href="https://www.npmjs.com/package/eslint-plugin-strudel"><img src="https://img.shields.io/npm/v/eslint-plugin-strudel.svg" alt="Version"></a>
<a href="https://www.npmjs.com/package/eslint-plugin-strudel"><img src="https://img.shields.io/npm/l/eslint-plugin-strudel.svg" alt="License"></a> 
</p>

> Official ESLint plugin for Strudel.js

## Requirements

* ESLint `^5.0.0`
* Node.js `>=6.10.0`

## Installation

Install ESLint either locally or globally.

```
$ npm i eslint eslint-plugin-strudel -D
```

## Usage

Create `.eslintrc` file to configure rules. See: [http://eslint.org/docs/user-guide/configuring](ttp://eslint.org/docs/user-guide/configuring)

Example `.eslintrc.js`:
```
{
  "extends": [
    "plugin:strudel/recommended"
  ]
}
```

## Configs

This plugin provides two predefined configs:

* `plugin:strudel/base`: Settings and rules to enable correct ESLint parsing
* `plugin:strudel/recommended`: Above, plus rules to prevent errors and ensure consistency

## Rules

* [strudel/element-import](docs/rules/element-import.md): enforce importing `element` as `$`
* [strudel/single-line-el](docs/rules/single-line-el.md): enforce using @El with it's property in one line
* [strudel/no-useless-init](docs/rules/no-useless-init.md): prevent useless init method
* [strudel/first-method-init](docs/rules/first-method-init.md): enforce init being first method if used
* [strudel/oninit-on-top](docs/rules/oninit-on-top.md): enforces methods decorated with @OnInit to be first methods of class
* [strudel/element-on-top](docs/rules/element-on-top.md): enforces properties decorated with @El to be on top of class body

## Contribution
Before you start writing new rule, please read the official [ESLint guide](https://eslint.org/docs/developer-guide/working-with-rules).

Next you need to get an idea how the AST looks like - use [astexplorer.net](http://astexplorer.net/) to inspect ASTs.

When writing tests for rules [Debugging Mocha guide for Visual Studio Code](https://github.com/Microsoft/vscode-recipes/tree/master/debugging-mocha-tests) may become helpful.

## License

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2017-present, Mateusz Łuczak
