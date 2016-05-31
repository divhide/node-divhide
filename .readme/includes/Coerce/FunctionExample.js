
var Coerce = Divhide.Coerce;

var fn = Coerce.function(function(){});
expect(fn())
    .toBe(undefined);

var fn = Coerce.function("");
expect(fn())
    .toBe(undefined);

var fn = Coerce.function("", function(){ return 1; });
expect(fn())
    .toBe(1);
