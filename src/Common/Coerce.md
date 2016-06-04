
Coerce facility provides an API to coerce data types safely. Using `Divhide.Coerce` you can
be sure that you always have the correct value to work with.

**Methods**

* `Coerce.array(value, defaultValue?)`

        Gets the value in the array representation.
        __defaultValue__ is returned if defined and if value is not an array.

* `Coerce.boolean(value, defaultValue?)`

* `Coerce.string(value, defaultValue?)`

* `Coerce.object(value, defaultValue?)`

* `Coerce.number(value, defaultValue?)`

* `Coerce.function(value, defaultValue?)`

* `Coerce.value(value, defaultValue?)`

* `Coerce.regexp(value, defaultValue)`

* `Coerce.instance(value, fn)`

        Gets an instance of the given value if is an instance of the given fn, otherwise it will
        create an instance.

* `Coerce.length(value)`

        Gets the length of the value.

* `Coerce.coerce(value, expected)`

        Gets the value coerced by the expected value type.

**Example** Array

```js

{%= _.include("Coerce/ArrayExample.js") %}

```

**Example** Boolean

```js

{%= _.include("Coerce/BooleanExample.js") %}

```

**Example** Function

```js

{%= _.include("Coerce/FunctionExample.js") %}

```

**Example** Length

```js

{%= _.include("Coerce/LengthExample.js") %}

```

**Example** Number

```js

{%= _.include("Coerce/NumberExample.js") %}

```

**Example** Object

```js

{%= _.include("Coerce/ObjectExample.js") %}

```

**Example** Regex

```js

{%= _.include("Coerce/RegexExample.js") %}

```

**Example** String

```js

{%= _.include("Coerce/StringExample.js") %}

```

**Example** Value

```js

{%= _.include("Coerce/ValueExample.js") %}

```
