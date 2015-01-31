'use strict';

describe("ChainSpec", function () {

    var Chain = Divhide.Chain;


    beforeEach(function (done) {

        jasmine.addMatchers({
            isEqual: function(expected) {

                return {
                    compare: function(actual, expected) {
                        return { pass: _.isEqual(actual, expected) };
                    }
                };

            }
        });

        done();

    });


    it("Divhide.Specs.ChainExample", function(){
        Divhide.Specs.ChainExample();
    });

    it("Chain() evaluation function arguments", function (done) {

        var chain = new Chain(
            {
                fn1: function(){},
                fn2: function(){}
            },
            {
                value: function(){
                    return _.toArray(arguments);
                }
            });


        var value = chain
            .fn1()
            .fn2()
            .value("value", "extra");

        expect(value)
            .isEqual([
                /// arguments:
                "value",
                "extra",
                /// error:
                null]);

        done();

    });

    it("Chain(,, { argument: ? }) evaluation function arguments", function (done) {

        var chain = new Chain(
            {
                fn1: function(){},
                fn2: function(){}
            },
            {
                value: function(){
                    return _.toArray(arguments);
                }
            },
            {
                argument: "custom_argument"
            });


        var value = chain
            .fn1()
            .fn2()
            .value("value", "extra");

        expect(value)
            .isEqual([
                /// arguments:
                "value",
                "extra",
                "custom_argument",
                /// error:
                null]);

        done();

    });

    it("Chain(?,?,{ pipe: true })", function (done) {

        var math = new Chain(
            {
                sum: function(i,j){
                    i = i || 0;
                    return i + j;
                },

                sub: function(i,j){
                    i = i || 0;
                    return i - j;
                }
            },
            {
                calculate: function(value){
                    return value;
                }
            },
            {
                pipe: true
            });


        var value = math
            .sum(5)
            .sub(3)
            .sum(5)
            .calculate();

        expect(value)
            .toBe(7);

        done();

    });

    it("Chain(?,?,?) exception", function (done) {

        var error = null;

        var chain = new Chain(
            {
                sum: function(i,j){
                    return i + j;
                },

                err: function(){
                    throw new Error("Error");
                }
            },
            {
                value: function(value, err){
                    error = err;
                    return value;
                }
            },
            {
                pipe: true
            });

        chain
            .sum(1)
            .sum(1)
            .err()
            .value(0);

        expect(error)
            .not.toBe("Error");

        done();

    });


    it("Chain() scope", function (done) {

        var args = [];

        var chain = new Chain(
            {
                fn: function(){
                    this.i = this.i || 0;
                    return ++this.i;
                }
            },
            {
                value: function(){
                    return this.i;
                }
            },
            {
                pipe: true
            });


        var value =chain
            .fn()
            .fn()
            .fn()
            .value();

        expect(value)
            .toBe(3);

        done();

    });


    it("Chain(?,?, { pipe: false }) array as argument", function (done) {

        var error = null;

        var chain = new Chain(
            {
                increment: function(list){
                    list = _.map(list, function(num){ return ++num; });
                    return list;
                }
            },
            {
                value: function(list){
                    return list;
                }
            },
            {
                pipe: true
            });

        var result = chain
            .increment()
            .value([ 0, 1, 2 ]);

        expect(result)
            .isEqual([ 1, 2, 3 ]);

        done();

    });


});