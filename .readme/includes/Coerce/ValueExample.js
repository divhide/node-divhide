
var Coerce = Divhide.Coerce;

var value = Coerce.value(1);
expect(value).toBe(1);

var value = Coerce.value("1");
expect(value).toBe("1");

var value = Coerce.value(null);
expect(value).toBe(null);

var value = Coerce.value(undefined);
expect(value).toBe(null);

var value = Coerce.value(null, 1);
expect(value).toBe(1);

