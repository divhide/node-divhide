'use strict';

describe("Assert.*Spec", function () {

    beforeEach(function () {
        jasmine.addMatchers(window.JasmineCustomMatchers);
    });

    it(".required()", function () {

        var required = Divhide.SubModules.Assert.Required;

        expect( required("a") )
            .toEqual("a");

        expect( required({}) )
            .toEqual({});

        expect( required([]) )
            .toEqual([]);

        expect(function(){ required(null); })
            .toThrow();

        expect(function(){ required(undefined); })
            .toThrow();

    });


    it(".string()", function () {

        var string = Divhide.SubModules.Assert.String;

        expect( string("a") )
            .toEqual("a");

        expect( string("") )
            .toEqual("");

        expect(function(){ string({}); })
            .toThrow();

        expect(function(){ string([]); })
            .toThrow();

        expect(function(){ string(null); })
            .toThrow();

        expect(function(){ string(undefined); })
            .toThrow();

    });


    it(".number()", function () {

        var number = Divhide.SubModules.Assert.Number;

        expect( number(0) )
            .toEqual(0);

        expect( number(0.1) )
            .toEqual(0.1);

        expect(function(){ number({}); })
            .toThrow();

        expect(function(){ number(NaN); })
            .toThrow();

        expect(function(){ number([]); })
            .toThrow();

        expect(function(){ number(null); })
            .toThrow();

        expect(function(){ number(undefined); })
            .toThrow();

    });


    it(".object()", function () {

        var object = Divhide.SubModules.Assert.Object;

        expect( object({}) )
            .toEqual({});

        expect(function(){ object(""); })
            .toThrow();

        expect(function(){ object([]); })
            .toThrow();

        expect(function(){ object(null); })
            .toThrow();

        expect(function(){ object(undefined); })
            .toThrow();

    });


    it(".array()", function () {

        var array = Divhide.SubModules.Assert.Array;

        expect( array([]) )
            .toEqual([]);

        expect(function(){ array({}); })
            .toThrow();

        expect(function(){ array(""); })
            .toThrow();

        expect(function(){ array(null); })
            .toThrow();

        expect(function(){ array(undefined); })
            .toThrow();

    });


    it(".max()", function () {

        var max = Divhide.SubModules.Assert.Max;

        expect( max(null) )
            .toEqual(null);

        expect( max([]) )
            .toEqual([]);

        expect( max({}) )
            .toEqual({});

        expect( max(1, 1) )
            .toEqual(1);

        expect( max("a", 1) )
            .toEqual("a");

        expect( max([1], 1) )
            .toEqual([1]);

        expect( max( { one: 1 }, 1) )
            .toEqual({ one: 1 });

        expect(function(){ max(2, 1); })
            .toThrow();

        expect(function(){ max("aa", 1); })
            .toThrow();

        expect(function(){ max([1,2], 1); })
            .toThrow();

        expect(function(){ max({ one: 1, two: 2 }, 1); })
            .toThrow();

    });


    it(".min()", function () {

        var min = Divhide.SubModules.Assert.Min;

        expect( min() )
            .toEqual(undefined);

        expect( min([1], 1) )
            .toEqual([1]);

        expect( min({ one: 1}, 1) )
            .toEqual({ one: 1});

        expect( min(1, 1) )
            .toEqual(1);

        expect( min("a", 1) )
            .toEqual("a");

        expect( min([1], 1) )
            .toEqual([1]);

        expect( min( { one: 1 }, 1) )
            .toEqual({ one: 1 });

        expect(function(){ min(0, 1); })
            .toThrow();

        expect(function(){ min(null, 1); })
            .toThrow();

        expect(function(){ min([], 1); })
            .toThrow();

        expect(function(){ min({}, 1); })
            .toThrow();

    });


    it(".regex()", function () {

        var regex = Divhide.SubModules.Assert.Regex;

        expect( regex("", null) )
            .toEqual("");

        expect( regex("aaa", "aaa") )
            .toEqual("aaa");

        expect( regex("aaa", /aaa/) )
            .toEqual("aaa");

        expect(function(){ regex("aaa", "bbb"); })
            .toThrow();

        expect(function(){ regex({}, "bbb"); })
            .toThrow();

        expect(function(){ regex([], "bbb"); })
            .toThrow();

    });

    it(".instanceOf()", function () {

        var instanceOf = Divhide.SubModules.Assert.InstanceOf;

        expect( instanceOf("a", String) )
            .toEqual("a");

        expect(function(){
            instanceOf(1, String);
        })
        .toThrowError(/Expected instance of 'String'/);

    });




});