

Chain facility provides an API to create chainable functions. Each Chain is created by a list of chainable functions, a list of evaluation
function and some options.

**Constructor**

* `new Chain(chainableFns, evaluationFns, options)`
<br />
Creates a Chain instance that allows you to execute chainable methods (__chainableFns__). The chain is only executed
when an evaluation method (__evaluationFns__) is called.
<br />
    * chainableFns
    * evaluationFns
    * options - `{ pipe: Boolean, type: Function, argument: *, scope: Object }`.

```js

{%= _.include("Chain/ChainExample.js") %}

```

