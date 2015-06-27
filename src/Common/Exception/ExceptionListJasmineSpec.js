'use strict';

describe("Exception.ExceptionListSpec", function () {

    var ExceptionList = Divhide.Exception.ExceptionList;

    beforeEach(function () {
        jasmine.addMatchers(window.JasmineCustomMatchers);
    });

    it("Divhide.Specs.ExceptionListDocExample", function () {
        Divhide.Specs.ExceptionListDocExample();
    });

    it("instanceof Error", function (done) {

        var error = new ExceptionList();

        expect(error instanceof Error)
            .toEqual(true);

        done();

    });

    it(".length", function (done) {

        var errors = new ExceptionList();
        errors.push(new Error("err1"));
        errors.push(new Error("err2"));

        expect(errors.length)
            .toEqual(2);

        done();

    });

    it(".push(Error)", function (done) {

        var errors = new ExceptionList();
        errors.push(new Error("err1"));

        expect(errors.items.length)
            .toEqual(1);

        expect(errors.items[0].message)
            .toEqual("err1");


        errors = new ExceptionList();
        errors.push([ new Error("err1"), new Error("err2") ]);

        expect(errors.items.length)
            .toEqual(2);

        expect(errors.items[0].message)
            .toEqual("err1");

        expect(errors.items[1].message)
            .toEqual("err2");


        done();

    });

    it(".push(ExceptionList)", function (done) {

        var errors = new ExceptionList();
        errors.push("error1");

        var errors2 = new ExceptionList();
        errors2.push("error2");

        errors.push(errors2);

        expect(errors.items.length)
            .toEqual(2);

        expect(errors.items[0].message)
            .toEqual("error1");

        expect(errors.items[1].message)
            .toEqual("error2");

        done();

    });


    it(".push(String)", function (done) {

        var errors = new ExceptionList();
        errors.push("error");

        expect(errors.items.length)
            .toEqual(1);

        expect(errors.items[0].message)
            .toEqual("error");

        done();

    });

    it(".push(?) throws", function (done) {

        var errors = new ExceptionList();

        var fn = function(){
            errors.push(["err1", 1]);
        };

        expect(fn).toThrow();

        done();

    });

    it(".clear()", function (done) {

        var errors = new ExceptionList();
        errors.push(new Error("err1"));
        errors.push(new Error("err2"));
        errors.push(new Error("err3"));
        errors.clear();

        expect(errors.items.length)
            .toEqual(0);

        done();

    });


});