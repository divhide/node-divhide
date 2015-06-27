'use strict';

describe("ArrSpec", function () {

    var Arr = Divhide.Arr;

    beforeEach(function () {
        jasmine.addMatchers(window.JasmineCustomMatchers);
    });


    it("Divhide.Specs.ArrSpec", function (done) {

        Divhide.Specs.ArrExample();
        done();

    });


    it(".insert()", function (done) {


        var arr = Arr.insert([1,2], 3);
        expect(arr).toEqual([1,2,3]);

        arr = Arr.insert([2,3], 1, 0);
        expect(arr).toEqual([1,2,3]);

        arr = Arr.insert([1,3], 2, 1);
        expect(arr).toEqual([1,2,3]);

        arr = Arr.insert([1,4], [2, 3], 1);
        expect(arr).toEqual([1,2,3,4]);

        done();


    });



    it(".index()", function (done) {

        var result = Arr.index([1,2,3], 1);
        expect(result)
            .toEqual(2);

        result = Arr.index([1,2,3], 3);
        expect(result)
            .toEqual(null);

        result = Arr.index([1,2,3], -3);
        expect(result)
            .toEqual(null);

        done();

    });



    it(".first()", function (done) {

        var result = Arr.first([1,2,3]);
        expect(result)
            .toEqual(1);

        result = Arr.first([]);
        expect(result)
            .toEqual(null);

        done();

    });


    it(".last()", function (done) {

        var result = Arr.last([1,2,3]);
        expect(result)
            .toEqual(3);

        result = Arr.last([]);
        expect(result)
            .toEqual(null);

        done();

    });


    it(".remove()", function (done) {


        var result = Arr.remove([1,2,3], 0);
        expect(result)
            .toEqual([1]);

        result = Arr.remove([1,2,3], 0, 10);
        expect(result)
            .toEqual([1, 2, 3]);

        result = Arr.remove([1,2,3], 1);
        expect(result)
            .toEqual([2]);

        result = Arr.remove([1,2,3], 5);
        expect(result)
            .toEqual([]);

        result = Arr.remove([], 1);
        expect(result)
            .toEqual([]);

        done();

    });




});
