'use strict';

describe("SafeSpec", function () {

    var Type = Divhide.Type;

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

    it("Divhide.Specs.SafeArrayExample", function () {
        Divhide.Specs.SafeArrayExample();
    });

    it("Divhide.Specs.SafeBooleanExample", function () {
        Divhide.Specs.SafeBooleanExample();
    });

    it("Divhide.Specs.SafeFunctionExample", function () {
        Divhide.Specs.SafeFunctionExample();
    });

    it("Divhide.Specs.SafeLengthExample", function () {
        Divhide.Specs.SafeLengthExample();
    });

    it("Divhide.Specs.SafeNumberExample", function () {
        Divhide.Specs.SafeNumberExample();
    });

    it("Divhide.Specs.SafeObjectExample", function () {
        Divhide.Specs.SafeObjectExample();
    });

    it("Divhide.Specs.SafeRegexExample", function () {
        Divhide.Specs.SafeRegexExample();
    });

    it("Divhide.Specs.SafeStringExample", function () {
        Divhide.Specs.SafeStringExample();
    });

    it("Divhide.Specs.SafeValueExample", function () {
        Divhide.Specs.SafeValueExample();
    });

    it(".array()", function (done) {

        var Safe = Divhide.Safe;

        var array = Safe.array([1]);
        expect(array).not.toBeNull();
        expect(array.length).toEqual(1);

        array = Safe.array(1);
        expect(array).not.toBeNull();
        expect(array.length).toEqual(1);

        array = Safe.array(null);
        expect(array).not.toBeNull();
        expect(array.length).toEqual(0);

        array = Safe.array(null, [1]);
        expect(array).not.toBeNull();
        expect(array.length).toEqual(1);

        done();


    });



    it(".boolean()", function (done) {

        var Safe = Divhide.Safe;

        var bool = Safe.boolean(true);
        expect(bool).toBeTruthy();

        bool = Safe.boolean(1);
        expect(bool).toBeTruthy();

        bool = Safe.boolean("1");
        expect(bool).toBeTruthy();

        bool = Safe.boolean(0);
        expect(bool).not.toBeTruthy();

        bool = Safe.boolean("0");
        expect(bool).not.toBeTruthy();

        bool = Safe.boolean(10);
        expect(bool).toBeTruthy();

        bool = Safe.boolean(10, false);
        expect(bool).not.toBeTruthy();

        bool = Safe.boolean({});
        expect(bool).not.toBeTruthy();

        bool = Safe.boolean([]);
        expect(bool).not.toBeTruthy();

        bool = Safe.boolean(null);
        expect(bool).not.toBeTruthy();

        bool = Safe.boolean(null, true);
        expect(bool).toBeTruthy();

        done();

    });



    it(".function()", function (done) {

        var Safe = Divhide.Safe;

        var fn = Safe.function(function(){});
        expect(fn).not.toBe(null);

        fn = Safe.function(null);
        expect(fn).not.toBe(null);

        fn = Safe.function(null, function(){});
        expect(fn).not.toBe(null);

        done();


    });


    it(".string()", function (done) {

        var Safe = Divhide.Safe;

        var str = Safe.string("a");
        expect(str).toBe("a");

        str = Safe.string(null);
        expect(str).toBe("");

        str = Safe.string({}, "lol");
        expect(str).toBe("lol");

        str = Safe.string({}, {});
        expect(str).toBe("");


        done();


    });



    it(".object()", function (done) {

        var Safe = Divhide.Safe;

        var obj = Safe.object({ one: 1 });

        expect(obj).not.toBe(null);
        expect(_.keys(obj).length).toBe(1);


        obj = Safe.object(null);

        expect(obj).not.toBe(null);
        expect(_.keys(obj).length).toBe(0);


        obj = Safe.object(null, { one: 1 });

        expect(obj).not.toBe(null);
        expect(obj.one).toBe(1);

        obj = Safe.object(null, "a");
        expect(obj).not.toBe(null);
        expect(obj).not.toBe("a");

        done();


    });



    it(".number()", function (done) {

        var Safe = Divhide.Safe;

        expect(Safe.number(1)).toBe(1);
        expect(Safe.number("1")).toBe(1);
        expect(Safe.number(null)).toBe(0);
        expect(Safe.number("a", 2)).toBe(2);
        expect(Safe.number("a", "b")).toBe(0);

        done();

    });


    it(".value()", function (done) {

        var Safe = Divhide.Safe;

        expect(Safe.value(1)).toBe(1);
        expect(Safe.value("1")).toBe("1");
        expect(Safe.value(null, 2)).toBe(2);
        expect(Safe.value(null)).toBe(null);
        expect(Safe.value(undefined)).toBe(null);

        done();

    });


    it(".regexp()", function (done) {

        var Safe = Divhide.Safe;

        var result = Safe.regexp("");
        expect( !!result.exec("lol") )
            .toBe(false);

        result = Safe.regexp("");
        expect( !!result.exec("") )
            .toBe(true);

        result = Safe.regexp("/lol/");
        expect( !!result.exec("lol") )
            .toBe(true);

        result = Safe.regexp(new RegExp("lol"));
        expect( !!result.exec("lol") )
            .toBe(true);

        result = Safe.regexp({}, "");
        expect( !!result.exec("lol") )
            .toBe(false);

        result = Safe.regexp({});
        expect( !!result.exec("lol") )
            .toBe(false);

        result = Safe.regexp([]);
        expect( !!result.exec("lol") )
            .toBe(false);

        result = Safe.regexp(null);
        expect( !!result.exec("lol") )
            .toBe(false);

        result = Safe.regexp(undefined);
        expect( !!result.exec("lol") )
            .toBe(false);

        done();

    });


    it(".length()", function (done) {

        var Safe = Divhide.Safe;

        expect(Safe.length(12))
            .toBe(12);

        expect(Safe.length("aa"))
            .toBe(2);

        expect(Safe.length(""))
            .toBe(0);

        expect(Safe.length([1,2,3]))
            .toBe(3);

        expect(Safe.length({ one: 1, two: 1}))
            .toBe(2);

        expect(Safe.length(true))
            .toBe(1);

        expect(Safe.length(false))
            .toBe(0);

        expect(Safe.length(null))
            .toBe(0);

        expect(Safe.length(undefined))
            .toBe(0);

        done();

    });


    it(".instanceOf()", function (done) {

        var Safe = Divhide.Safe;

        var Class = function(name){
            this.name = name || "default";
        };

        var instance = Safe.instanceOf(new Class("new"), Class);
        expect(instance.name)
            .equals("new");

        instance = Safe.instanceOf({}, Class);
        expect(instance.name)
            .equals("default");

        instance = Safe.instanceOf("", Class);
        expect(instance.name)
            .equals("default");

        instance = Safe.instanceOf(null, Class);
        expect(instance.name)
            .equals("default");

        instance = Safe.instanceOf(undefined, Class);
        expect(instance.name)
            .equals("default");

        instance = Safe.instanceOf(null);
        expect(Type.isObject(instance))
            .equals(true);

        instance = Safe.instanceOf();
        expect(Type.isObject(instance))
            .equals(true);


        done();

    });



});
