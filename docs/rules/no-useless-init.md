# Element import

## Descritpion

Enforces not using element export directly.
Suggested approach is to import $ from Strudel or reassign your import to $.

This rule supports eslint --fix.

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
