
var Coerce = Divhide.Coerce;

var value = Coerce.length([1, 2]);
expect(value).toBe(2);

var value = Coerce.length({ one: 1, two: 2});
expect(value).toBe(2);

var value = Coerce.length(2);
expect(value).toBe(2);

var value = Coerce.length("hello");
expect(value).toBe(5);
