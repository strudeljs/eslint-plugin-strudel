# Element import

## Descritpion
Enforces using @El decorator in single line with decorated property for best readability.

This rule supports eslint --fix. 

## Rule details

Example of incorrect code for this rule

```
class TestClass {
    @El('selector') 
    property
}
```

Example of correct code for this rule:

```
class TestClass {
    @El('selector') property
}
```

## Options
This rule have no additional options.