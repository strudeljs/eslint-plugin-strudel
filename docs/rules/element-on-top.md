# Element import

## Descritpion

Enforces properties decorated with @El to be placed on top of the class.
This takes precendence over all methods and properties.

## Rule details

Example of incorrect code for this rule

```
    @Component('asdf')
    class Test {
        init() {}
    
        @El('selector') property
    }
```

Example of correct code for this rule:

```
    @Component('test')
    class Test {
        @El('.selector') property
        @El('.selector2') property2 
    
        init() {}
    }
```

## Options

This rule have no additional options.
