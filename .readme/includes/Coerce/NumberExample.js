
var Coerce = Divhide.Coerce;

var value = Coerce.number(1);
expect(value).equals(1);

var value = Coerce.number("");
expect(value).equals(0);

var value = Coerce.number("1");
expect(value).equals(1);

var value = Coerce.number({});
expect(value).equals(0);

var value = Coerce.number("", 1);
expect(value).equals(1);
