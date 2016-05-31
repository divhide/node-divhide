
var Coerce = Divhide.Coerce;

var value = Coerce.object({ one: 1 });
expect(value).equals({ one: 1 });

var value = Coerce.object([]);
expect(value).equals({});

var value = Coerce.object([], { one: 1 });
expect(value).equals({ one: 1 });

