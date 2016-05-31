
Traverse module provides structure traversal using top-down and bottom-up algorithms. The callback contains information about the parent, level and other useful information.

``` js

var res = Divhide.Traverse
    .each(function(val, info, accumulator){
        // top-down callback
    })
    .afterEach(function(val, info, accumulator){
        // bottom-up callback
    })
    // set transform to change structure while traversing
    .transform(false)
    // initialize accumulator
    .accumulator(null)
    // start the structure traversal
    .traverse([1, 2, 3]);

```