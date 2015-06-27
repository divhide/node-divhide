'use strict';

describe("Exception.ExceptionSpec", function () {

    var I18NString  = Divhide.I18N.String,
        Exception   = Divhide.Exception.Exception;

    beforeEach(function () {
        jasmine.addMatchers(window.JasmineCustomMatchers);
    });
    
    it("Divhide.Specs.ExceptionDocExample", function() {
        Divhide.Specs.ExceptionDocExample();
    });

    it("instanceof Error", function (done) {

        var str = new Exception("");
        expect(str instanceof Error).equals(true);

        done();

    });

    it(".toString(i18nString)", function (done) {

        var str = new I18NString("INVALID", { value: "value" });
        var error = new Exception(str);

        expect(error.toString())
            .equals("INVALID");

        expect(error.toString({ "INVALID": "invalid: <%= value %>" }))
            .equals("invalid: value");

        done();

    });

    it(".toString()", function (done) {

        var error = new Exception("value");
        expect(error.toString()).equals("value");

        done();

    });

});
