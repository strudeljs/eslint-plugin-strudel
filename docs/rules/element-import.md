# Element import

## Descritpion
Enforces not using element export directly. 
Suggested approach is to import $ from Strudel or reassign your import to $.

## Rule details

Example of incorrect code for this rule

```
import { element } from "strudel";
```

Example of correct code for this rule:

```
import { element as $ } from "strudel";
import { $ } from "strudel";
```

## Options
This rule have no additional options.