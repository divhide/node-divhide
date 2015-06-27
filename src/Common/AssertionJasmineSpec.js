'use strict';

describe("AssertionSpec", function () {

    beforeEach(function () {
        jasmine.addMatchers(window.JasmineCustomMatchers);
    });
    
    it("Divhide.Specs.AssertionExample", function () {
        Divhide.Specs.AssertionExample();
    });

    it(".ctor({})", function (done) {

        var Assertion = Divhide.Assertion;

        var Assert = new Assertion({
            test: function(value){ return value; }
        });

        var result = Assert
                        .test()
                        .required()
                        .test()
                        .string()
                        .isValid("aaa");

        expect(result).toEqual(true);

        done();

    });


    it("instanceof Assertion", function (done) {

        var Assertion = Divhide.Assertion;

        var Assert = new Assertion();
        var rule = Assert.required().string();

        expect(rule instanceof Assertion)
            .toEqual(true);

        done();

    });


});