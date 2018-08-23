# Element import

## Descritpion

Enforces methods decorated with @OnInit to be first methods of class.
Exception to this rule is init() method that if present should be always first method.

## Rule details

Example of incorrect code for this rule

```
    @Component('asdf')
    class Test {
        method() {}
        
        @OnInit
        render() {}
    }
```

Example of correct code for this rule:

```
    @Component('test')
    class Test {
        @OnInit
        render() {}

        method() {}
    }

    @Component('test')
    class Test {
        init() {}

        @OnInit
        render() {}
    }
```

## Options

This rule have no additional options.
