'use strict';

describe("AssertionSpec", function () {

    beforeEach(function (done) {

        jasmine.addMatchers({
            equals: function(expected) {

                return {
                    compare: function(actual, expected) {
                        return { pass: _.isEqual(actual, expected) };
                    }
                };

            }
        });

        done();

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