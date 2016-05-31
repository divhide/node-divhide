
var Coerce = Divhide.Coerce;

var value = Coerce.string("");
expect(value).toBe("");

var value = Coerce.string({});
expect(value).toBe("");

var value = Coerce.string({}, "default");
expect(value).toBe("default");

