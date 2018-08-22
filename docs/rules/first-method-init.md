# Element import

## Descritpion

Enforces init method being first method of class if used.

## Rule details

Example of incorrect code for this rule

```
    @Component('test')
    class Test {
        render() {}

        init() {}
    }
```

Example of correct code for this rule:

```
    @Component('test')
    class Test {
        @El('.selector') $property
        init() {}
    }

    @Component('test')
    class Test {
        init() {}
        render() {}
    }
```

## Options

This rule have no additional options.
