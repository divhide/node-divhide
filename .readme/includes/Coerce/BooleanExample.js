
var Coerce = Divhide.Coerce;

var value = Coerce.boolean(true);
expect(value).toBe(true);

var value = Coerce.boolean(false);
expect(value).toBe(false);

var value = Coerce.boolean(1);
expect(value).toBe(true);

var value = Coerce.boolean("1");
expect(value).toBe(true);

var value = Coerce.boolean("0");
expect(value).toBe(false);

var value = Coerce.boolean({});
expect(value).toBe(false);

var value = Coerce.boolean({}, true);
expect(value).toBe(true);

var value = Coerce.boolean([]);
expect(value).toBe(false);

var value = Coerce.boolean(null);
expect(value).toBe(false);
