'use strict';

describe("AssertSpec", function () {

    beforeEach(function () {
        jasmine.addMatchers(window.JasmineCustomMatchers);
    });
    
    it("Divhide.Specs.AssertExample", function() {
        Divhide.Specs.AssertExample();
    });

    it("context should be reset on new Assert", function () {

        var Assert = Divhide.Assert;

        var val = Assert.required().string().assert("aaa");
        expect(val)
            .toEqual("aaa");


        val = Assert.required().number().assert(1);
        expect(val)
            .toEqual(1);

    });

    it(".isValid()", function (done) {

        var Assert = Divhide.Assert;

        var result = Assert
                        .required()
                        .string()
                        .isValid("aaa");

        expect(result).toEqual(true);

        result = Assert
                    .required()
                    .string()
                    .isValid(1);

        expect(result).toEqual(false);

        done();

    });


    it(".assert()", function (done) {

        var Assert = Divhide.Assert;

        var result = Assert
                        .required()
                        .string()
                        .assert("aaa");

        expect(result).toEqual("aaa");

        done();

    });


    it(".assert() error", function (done) {

        var Assert = Divhide.Assert;

        var validation = function(){
            Assert
                .required()
                .string()
                .max(1)
                .assert("aaa");
        };

        expect(validation)
            .toThrow();

        done();

    });


});