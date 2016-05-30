'use strict';

describe("Divhide.Traverse", function () {

    beforeEach(function () {
        jasmine.addMatchers(window.JasmineCustomMatchers);
    });

    describe("circular reference", function(){

        it("object should throw an Error", function () {

            // setup circular structure
            var a = {};
            var b = {
                "c": a,
                "d": 1
            };
            a.b = b;

            var indexes = [],
                circularReferences = [];

            Divhide.Traverse
                .topDown(function(val, info){
                    indexes.push(info.index);
                    circularReferences.push(info.isCircularReference);
                })
                .traverse(a, a);

            expect(indexes)
                .toEqual([null, "b", "c", "b", "d"]);

            expect(circularReferences)
                .toEqual([false, false, false, true, false]);

        });

        it("array should throw an Error", function () {

            // setup circular structure
            var a = [];
            var b = [ a ];
            a.push(b);

            var indexes = [],
                circularReferences = [];

            Divhide.Traverse
                .topDown(function(val, info){
                    indexes.push(info.index);
                    circularReferences.push(info.isCircularReference);
                })
                .traverse(a);

            expect(indexes)
                .toEqual([null, 0, 0, 0]);

            expect(circularReferences)
                .toEqual([false, false, false, true]);

        });

    });

    describe("auxiliar", function(){

        it("info.data should be shared while traversal", function () {

            // setup circular structure
            var a = {
                "b": {
                    "c": 1
                }
            };

            var values = [];

            Divhide.Traverse.topDown(function(val, info){
                info.data.value = info.data.value ? info.data.value+1 : 1;
                values.push(info.data.value);
            }).traverse(a);

            expect(values)
                .toEqual([1, 2, 3]);

        });

        it("info.tmpData should be shared across callback and callbackAfter for the same object", function () {

            // setup circular structure
            var a = {
                "b": {
                    "c": 1
                }
            };

            var cValues = [],
                cAfterValues = [];

            Divhide.Traverse
                .topDown(function(val, info){
                    info.tmpData.value = info.tmpData.value ? info.tmpData.value+1 : 1;
                    cValues.push(info.tmpData.value);
                })
                .bottomUp(function(val, info){
                    info.tmpData.value = info.tmpData.value ? info.tmpData.value+1 : 1;
                    cAfterValues.push(info.tmpData.value);
                })
                .traverse(a);

            expect(cValues).toEqual([1, 1, 1]);
            expect(cAfterValues).toEqual([2, 2, 2]);

        });

    });

});