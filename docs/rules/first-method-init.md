# Element import

## Descritpion

Enforces init method being first method of class if used.

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
