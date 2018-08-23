# eslint-plugin-strudel

## Installation

Install ESLint either locally or globally.

```
$ npm i eslint -D
$ npm install eslint-plugin-strudel -D
```

# List of supported rules

* [strudel/element-import](docs/rules/element-import.md): enforce importing `element` as `$`
* [strudel/single-line-el](docs/rules/single-line-el.md): enforce using @El with it's property in one line
* [strudel/no-useless-init](docs/rules/no-useless-init.md): prevent useless init method
* [strudel/first-method-init](docs/rules/first-method-init.md): enforce init being first method if used
* [strudel/oninit-on-top](docs/rules/oninit-on-top.md): enforces methods decorated with @OnInit to be first methods of class

# Debugging

[Debugging Mocha in Visual Studio Code](https://github.com/Microsoft/vscode-recipes/tree/master/debugging-mocha-tests)

## License

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2017-present, Mateusz Łuczak
