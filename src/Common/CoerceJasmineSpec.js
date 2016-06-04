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

    it(".array()", function() {

        var array = Divhide.Coerce.array([1]);
        expect(array).not.toBeNull();
        expect(array.length).toEqual(1);

        array = Divhide.Coerce.array(1);
        expect(array).not.toBeNull();
        expect(array.length).toEqual(1);

        array = Divhide.Coerce.array(null);
        expect(array).not.toBeNull();
        expect(array.length).toEqual(0);

        array = Divhide.Coerce.array(null, [1]);
        expect(array).not.toBeNull();
        expect(array.length).toEqual(1);

    });

    it(".boolean()", function() {

        var bool = Divhide.Coerce.boolean(true);
        expect(bool).toBeTruthy();

        bool = Divhide.Coerce.boolean(1);
        expect(bool).toBeTruthy();

        bool = Divhide.Coerce.boolean("1");
        expect(bool).toBeTruthy();

        bool = Divhide.Coerce.boolean(0);
        expect(bool).not.toBeTruthy();

        bool = Divhide.Coerce.boolean("0");
        expect(bool).not.toBeTruthy();

        bool = Divhide.Coerce.boolean(10);
        expect(bool).toBeTruthy();

        bool = Divhide.Coerce.boolean(10, false);
        expect(bool).not.toBeTruthy();

        bool = Divhide.Coerce.boolean({});
        expect(bool).not.toBeTruthy();

        bool = Divhide.Coerce.boolean([]);
        expect(bool).not.toBeTruthy();

        bool = Divhide.Coerce.boolean(null);
        expect(bool).not.toBeTruthy();

        bool = Divhide.Coerce.boolean(null, true);
        expect(bool).toBeTruthy();

    });

    it(".function()", function() {

        var fn = Divhide.Coerce.function(function(){});
        expect(fn).not.toBe(null);

        fn = Divhide.Coerce.function(null);
        expect(fn).not.toBe(null);

        fn = Divhide.Coerce.function(null, function(){});
        expect(fn).not.toBe(null);

    });

    it(".string()", function() {

        var str = Divhide.Coerce.string("a");
        expect(str).toBe("a");

        str = Divhide.Coerce.string(null);
        expect(str).toBe("");

        str = Divhide.Coerce.string({}, "lol");
        expect(str).toBe("lol");

        str = Divhide.Coerce.string({}, {});
        expect(str).toBe("");

    });

    it(".object()", function() {

        var obj = Divhide.Coerce.object({ one: 1 });

        expect(obj).not.toBe(null);
        expect(_.keys(obj).length).toBe(1);

        obj = Divhide.Coerce.object(null);

        expect(obj).not.toBe(null);
        expect(_.keys(obj).length).toBe(0);

        obj = Divhide.Coerce.object(null, { one: 1 });

        expect(obj).not.toBe(null);
        expect(obj.one).toBe(1);

        obj = Divhide.Coerce.object(null, "a");

        expect(obj).not.toBe(null);
        expect(obj).not.toBe("a");

    });

    it(".number()", function() {

        expect(Divhide.Coerce.number(1)).toBe(1);
        expect(Divhide.Coerce.number("1")).toBe(1);
        expect(Divhide.Coerce.number(null)).toBe(0);
        expect(Divhide.Coerce.number("a", 2)).toBe(2);
        expect(Divhide.Coerce.number("a", "b")).toBe(0);

    });

    it(".value()", function() {

        expect(Divhide.Coerce.value(1)).toBe(1);
        expect(Divhide.Coerce.value("1")).toBe("1");
        expect(Divhide.Coerce.value(null, 2)).toBe(2);
        expect(Divhide.Coerce.value(null)).toBe(null);
        expect(Divhide.Coerce.value(undefined)).toBe(null);

    });

    it(".regexp()", function() {

        var result = Divhide.Coerce.regexp("");
        expect( !!result.exec("lol") )
            .toBe(false);

        result = Divhide.Coerce.regexp("");
        expect( !!result.exec("") )
            .toBe(true);

        result = Divhide.Coerce.regexp("/lol/");
        expect( !!result.exec("lol") )
            .toBe(true);

        result = Divhide.Coerce.regexp(new RegExp("lol"));
        expect( !!result.exec("lol") )
            .toBe(true);

        result = Divhide.Coerce.regexp({}, "");
        expect( !!result.exec("lol") )
            .toBe(false);

        result = Divhide.Coerce.regexp({});
        expect( !!result.exec("lol") )
            .toBe(false);

        result = Divhide.Coerce.regexp([]);
        expect( !!result.exec("lol") )
            .toBe(false);

        result = Divhide.Coerce.regexp(null);
        expect( !!result.exec("lol") )
            .toBe(false);

        result = Divhide.Coerce.regexp(undefined);
        expect( !!result.exec("lol") )
            .toBe(false);

    });

    it(".length()", function() {

        expect(Divhide.Coerce.length(12))
            .toBe(12);

        expect(Divhide.Coerce.length("aa"))
            .toBe(2);

        expect(Divhide.Coerce.length(""))
            .toBe(0);

        expect(Divhide.Coerce.length([1,2,3]))
            .toBe(3);

        expect(Divhide.Coerce.length({ one: 1, two: 1}))
            .toBe(2);

        expect(Divhide.Coerce.length(true))
            .toBe(1);

        expect(Divhide.Coerce.length(false))
            .toBe(0);

        expect(Divhide.Coerce.length(null))
            .toBe(0);

        expect(Divhide.Coerce.length(undefined))
            .toBe(0);

    });

    it(".instance()", function() {

        var Class = function(name){
            this.name = name || "default";
        };

        var instance = Divhide.Coerce.instance(new Class("new"), Class);
        expect(instance.name)
            .equals("new");

        instance = Divhide.Coerce.instance({}, Class);
        expect(instance.name)
            .equals("default");

        instance = Divhide.Coerce.instance("", Class);
        expect(instance.name)
            .equals("default");

        instance = Divhide.Coerce.instance(null, Class);
        expect(instance.name)
            .equals("default");

        instance = Divhide.Coerce.instance(undefined, Class);
        expect(instance.name)
            .equals("default");

        instance = Divhide.Coerce.instance(null);
        expect(Type.isObject(instance))
            .equals(true);

        instance = Divhide.Coerce.instance();
        expect(Type.isObject(instance))
            .equals(true);

    });

    describe(".coerce()", function () {

        it(".coerce(, Boolean)", function () {

            var value = Divhide.Coerce.coerce(true, Boolean());
            expect(value)
                .toBe(true);

            value = Divhide.Coerce.coerce(false, Boolean());
            expect(value)
                .toBe(false);

            value = Divhide.Coerce.coerce(1, Boolean());
            expect(value)
                .toBe(true);

            value = Divhide.Coerce.coerce(0, Boolean());
            expect(value)
                .toBe(false);

            value = Divhide.Coerce.coerce(9999, Boolean());
            expect(value)
                .toBe(9999);

            value = Divhide.Coerce.coerce("true", Boolean());
            expect(value)
                .toBe(true);

            value = Divhide.Coerce.coerce("false", Boolean());
            expect(value)
                .toBe(false);

            value = Divhide.Coerce.coerce("no", Boolean());
            expect(value)
                .toBe("no");

        });

    });

});
