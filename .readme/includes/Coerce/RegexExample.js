
var Coerce = Divhide.Coerce;

var value = Coerce.regexp(/regexp/);
expect(value)
    .toEqual(/regexp/);

var value = Coerce.regexp("/regexp/");
expect(value)
    .toEqual(/regexp/);

var value = Coerce.regexp("");
expect(value)
    .toEqual(/^$/);

var value = Coerce.regexp("name");
expect(value)
    .toEqual(/^name$/);

var value = Coerce.regexp({}, /regexp/);
expect(value)
    .toEqual(/regexp/);
