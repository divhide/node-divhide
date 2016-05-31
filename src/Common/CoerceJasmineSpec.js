'use strict';

describe("CoerceSpec", function () {

    var Type = Divhide.Type;

    beforeEach(function () {
        jasmine.addMatchers(window.JasmineCustomMatchers);
    });

    describe("Docs.Specs", function(){

        it("CoerceArrayExample", function () {
            Divhide.Specs.CoerceArrayExample();
        });

        it("CoerceBooleanExample", function () {
            Divhide.Specs.CoerceBooleanExample();
        });

        it("CoerceFunctionExample", function () {
            Divhide.Specs.CoerceFunctionExample();
        });

        it("CoerceLengthExample", function () {
            Divhide.Specs.CoerceLengthExample();
        });

        it("CoerceNumberExample", function () {
            Divhide.Specs.CoerceNumberExample();
        });

        it("CoerceObjectExample", function () {
            Divhide.Specs.CoerceObjectExample();
        });

        it("CoerceRegexExample", function () {
            Divhide.Specs.CoerceRegexExample();
        });

        it("CoerceStringExample", function () {
            Divhide.Specs.CoerceStringExample();
        });

        it("CoerceValueExample", function () {
            Divhide.Specs.CoerceValueExample();
        });

    });

    it(".array()", function (done) {

        var Coerce = Divhide.Coerce;

        var array = Coerce.array([1]);
        expect(array).not.toBeNull();
        expect(array.length).toEqual(1);

        array = Coerce.array(1);
        expect(array).not.toBeNull();
        expect(array.length).toEqual(1);

        array = Coerce.array(null);
        expect(array).not.toBeNull();
        expect(array.length).toEqual(0);

        array = Coerce.array(null, [1]);
        expect(array).not.toBeNull();
        expect(array.length).toEqual(1);

        done();


    });



    it(".boolean()", function (done) {

        var Coerce = Divhide.Coerce;

        var bool = Coerce.boolean(true);
        expect(bool).toBeTruthy();

        bool = Coerce.boolean(1);
        expect(bool).toBeTruthy();

        bool = Coerce.boolean("1");
        expect(bool).toBeTruthy();

        bool = Coerce.boolean(0);
        expect(bool).not.toBeTruthy();

        bool = Coerce.boolean("0");
        expect(bool).not.toBeTruthy();

        bool = Coerce.boolean(10);
        expect(bool).toBeTruthy();

        bool = Coerce.boolean(10, false);
        expect(bool).not.toBeTruthy();

        bool = Coerce.boolean({});
        expect(bool).not.toBeTruthy();

        bool = Coerce.boolean([]);
        expect(bool).not.toBeTruthy();

        bool = Coerce.boolean(null);
        expect(bool).not.toBeTruthy();

        bool = Coerce.boolean(null, true);
        expect(bool).toBeTruthy();

        done();

    });



    it(".function()", function (done) {

        var Coerce = Divhide.Coerce;

        var fn = Coerce.function(function(){});
        expect(fn).not.toBe(null);

        fn = Coerce.function(null);
        expect(fn).not.toBe(null);

        fn = Coerce.function(null, function(){});
        expect(fn).not.toBe(null);

        done();


    });


    it(".string()", function (done) {

        var Coerce = Divhide.Coerce;

        var str = Coerce.string("a");
        expect(str).toBe("a");

        str = Coerce.string(null);
        expect(str).toBe("");

        str = Coerce.string({}, "lol");
        expect(str).toBe("lol");

        str = Coerce.string({}, {});
        expect(str).toBe("");


        done();


    });



    it(".object()", function (done) {

        var Coerce = Divhide.Coerce;

        var obj = Coerce.object({ one: 1 });

        expect(obj).not.toBe(null);
        expect(_.keys(obj).length).toBe(1);


        obj = Coerce.object(null);

        expect(obj).not.toBe(null);
        expect(_.keys(obj).length).toBe(0);


        obj = Coerce.object(null, { one: 1 });

        expect(obj).not.toBe(null);
        expect(obj.one).toBe(1);

        obj = Coerce.object(null, "a");
        expect(obj).not.toBe(null);
        expect(obj).not.toBe("a");

        done();


    });



    it(".number()", function (done) {

        var Coerce = Divhide.Coerce;

        expect(Coerce.number(1)).toBe(1);
        expect(Coerce.number("1")).toBe(1);
        expect(Coerce.number(null)).toBe(0);
        expect(Coerce.number("a", 2)).toBe(2);
        expect(Coerce.number("a", "b")).toBe(0);

        done();

    });


    it(".value()", function (done) {

        var Coerce = Divhide.Coerce;

        expect(Coerce.value(1)).toBe(1);
        expect(Coerce.value("1")).toBe("1");
        expect(Coerce.value(null, 2)).toBe(2);
        expect(Coerce.value(null)).toBe(null);
        expect(Coerce.value(undefined)).toBe(null);

        done();

    });


    it(".regexp()", function (done) {

        var Coerce = Divhide.Coerce;

        var result = Coerce.regexp("");
        expect( !!result.exec("lol") )
            .toBe(false);

        result = Coerce.regexp("");
        expect( !!result.exec("") )
            .toBe(true);

        result = Coerce.regexp("/lol/");
        expect( !!result.exec("lol") )
            .toBe(true);

        result = Coerce.regexp(new RegExp("lol"));
        expect( !!result.exec("lol") )
            .toBe(true);

        result = Coerce.regexp({}, "");
        expect( !!result.exec("lol") )
            .toBe(false);

        result = Coerce.regexp({});
        expect( !!result.exec("lol") )
            .toBe(false);

        result = Coerce.regexp([]);
        expect( !!result.exec("lol") )
            .toBe(false);

        result = Coerce.regexp(null);
        expect( !!result.exec("lol") )
            .toBe(false);

        result = Coerce.regexp(undefined);
        expect( !!result.exec("lol") )
            .toBe(false);

        done();

    });


    it(".length()", function (done) {

        var Coerce = Divhide.Coerce;

        expect(Coerce.length(12))
            .toBe(12);

        expect(Coerce.length("aa"))
            .toBe(2);

        expect(Coerce.length(""))
            .toBe(0);

        expect(Coerce.length([1,2,3]))
            .toBe(3);

        expect(Coerce.length({ one: 1, two: 1}))
            .toBe(2);

        expect(Coerce.length(true))
            .toBe(1);

        expect(Coerce.length(false))
            .toBe(0);

        expect(Coerce.length(null))
            .toBe(0);

        expect(Coerce.length(undefined))
            .toBe(0);

        done();

    });


    it(".instanceOf()", function (done) {

        var Coerce = Divhide.Coerce;

        var Class = function(name){
            this.name = name || "default";
        };

        var instance = Coerce.instanceOf(new Class("new"), Class);
        expect(instance.name)
            .equals("new");

        instance = Coerce.instanceOf({}, Class);
        expect(instance.name)
            .equals("default");

        instance = Coerce.instanceOf("", Class);
        expect(instance.name)
            .equals("default");

        instance = Coerce.instanceOf(null, Class);
        expect(instance.name)
            .equals("default");

        instance = Coerce.instanceOf(undefined, Class);
        expect(instance.name)
            .equals("default");

        instance = Coerce.instanceOf(null);
        expect(Type.isObject(instance))
            .equals(true);

        instance = Coerce.instanceOf();
        expect(Type.isObject(instance))
            .equals(true);


        done();

    });

    describe(".coerce()", function () {

        it(".coerce(, Boolean)", function () {

            var Coerce = Divhide.Coerce;

            var value = Coerce.coerce(true, Boolean());
            expect(value)
                .toBe(true);

            value = Coerce.coerce(false, Boolean());
            expect(value)
                .toBe(false);

            value = Coerce.coerce(1, Boolean());
            expect(value)
                .toBe(true);

            value = Coerce.coerce(0, Boolean());
            expect(value)
                .toBe(false);

            value = Coerce.coerce(9999, Boolean());
            expect(value)
                .toBe(9999);

            value = Coerce.coerce("true", Boolean());
            expect(value)
                .toBe(true);

            value = Coerce.coerce("false", Boolean());
            expect(value)
                .toBe(false);

            value = Coerce.coerce("no", Boolean());
            expect(value)
                .toBe("no");

        });

    });

});
