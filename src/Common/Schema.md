
The Schema facility provide an easy way to write validation rules. Using a chainable API you can
compile and/or evaluate the rules.

**Methods**

`.any()`
<br />
Set the expected type as any object.

`.strict()`
<br />
Disable the type coercion. Strict types are required.

`.string()`
<br />
Set the expected type as a string

`.number()`
<br />
Set the expected type as a number

`.boolean()`
<br />
Set the expected type as a boolean

`.object(value)`
<br />
Set the expected type as an object. The **value** is an object with rules.

`.array(value)`
<br />
Set the expected type as an object. The **value** is an array with rules.

`.function()`
<br />
Set the expected type as a function.

`.required()`
<br />
Set as required.

`.optional()`
<br />
Set as optional

`.default(value)`
<br />
Set the default value. This is used when the schema its required and the provided value is null.

`.repeatable()`
<br />
Set the type as repeatable. This repeats the schema through the structure (array only!).

`.min(value)`
<br />
Set the min value expected. If in number context the value is used. If in string context the length is used.
If in array context the length is used. If in object context the number of keys is used.

`.max(value)`
<br />
Set the max value expected. If in number context the value is used. If in string context the length is used.
If in array context the length is used. If in object context the number of keys is used.

`.regex(value)`
<br />
Sets a regexp condition ( only use on string context! )

`.compile()`
<br />
Compiles the schema. If you are using the same Schema multiple time you can compile it for performance reasons.
This avoid compiling the Schema before every usage.

`.value(value)`
<br />
Test the schema returning the normalized value if valid. Throws an Error if invalid.

`.isValid(value)`
<br />
Test the schema return if its valid or not.

`.errors(value)`
<br />
Test the schema returning an Array with the errors

`.serialize()`
<br />
Gets the serialized schema representation.

`.deserialize(value)`
<br />
Gets the Schema from the given value.


**Example** overview

```js

{%= _.include("Schema/SchemaOverview.js") %}


```

**Example** String Schema

```js

{%= _.include("Schema/SchemaStringExample.js") %}


```

Time to see some code! Some usage examples are described below.

**Example** Number Schema

```js

{%= _.include("Schema/SchemaNumberExample.js") %}


```

**Example** Schema (de)serialization

```js

{%= _.include("Schema/SchemaSerializationExample.js") %}


```

**Example** Object Schema

Objects schema is set by applying rules to each property of the object. You can also use regular expressions on
the schema object keys to give better filtering.

You can also set the schema object keys to primitive values which will be interpreted as `required().default(value)`
in the schema.

```js

{%= _.include("Schema/SchemaObjectExample.js") %}


```
**Example** Array Schema

The following example describe an array rule that is optional and its expecting three items.

```js

{%= _.include("Schema/SchemaArrayExample.js") %}


```
