
var Coerce = Divhide.Coerce;

var value = Coerce.array(1);
expect(value)
    .equals([1]);

var value = Coerce.array(1);
expect(value)
    .equals([1]);

var value = Coerce.array([1, 2]);
expect(value)
    .equals([1, 2]);

var value = Coerce.array(null, [ 1, 2 ]);
expect(value)
    .equals([1, 2]);

var value = Coerce.array("1", [1, 2]);
expect(value)
    .equals(["1"]);
