# Element import

## Descritpion
Enforces using @El decorator with variable instead of strings to avoid unintentional selector duplication. 

## Rule details

Example of incorrect code for this rule

```
class TestClass {
    @El('selector') property
}
```

Example of correct code for this rule:

```
const selectors = {
    classSelector: 'selector'
};

class TestClass {
    @El(selectors.classSelector) property
}
```

## Options
This rule have no additional options.