'use strict';

describe("Assert.*Spec", function () {

    beforeEach(function (done) {

        done();

    });


    it(".required()", function (done) {

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

        done();

    });


    it(".string()", function (done) {

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


        done();

    });


    it(".number()", function (done) {

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


        done();

    });


    it(".object()", function (done) {

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


        done();

    });


    it(".array()", function (done) {

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

        done();

    });


    it(".max()", function (done) {

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

        done();

    });


    it(".min()", function (done) {

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

        done();
    });


    it(".regex()", function (done) {

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

        done();

    });




});