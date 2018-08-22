# Element import

## Descritpion

Enforces not using useless init method that can be replaced by using @OnInit decorator on appropriate method calls.
It also prevents from leaving empty init method in class body.

## Rule details

Example of incorrect code for this rule

```
    @Component('test-component')
    class Test {
        init() {
            this.render();
        }
    }

    @Component('test-component')
    class Test {
        init() {}
    }
```

Example of correct code for this rule:

```
    @Component('test')
    class Test {
        init() {
            const props = this.$data.props;
            this.render();
        }
    }

    @Component('test')
    class Test {
        @OnInit
        render() {}
    }
```

## Options

This rule have no additional options.
