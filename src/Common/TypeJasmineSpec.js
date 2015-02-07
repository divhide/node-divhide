'use strict';

describe("TypeSpec", function () {


    beforeEach(function (done) {

        done();

    });

    it("Divhide.Specs.TypeExample", function (done) {

        Divhide.Specs.TypeExample();
        done();

    });

    it(".isArray(Array)", function (done) {

        var Type = Divhide.Type;

        var isArray = Type.isArray(["adasdasdas"]);
        expect(isArray).toBeTruthy();

        isArray = Type.isArray(null);
        expect(isArray).not.toBeTruthy();

        isArray = Type.isArray({});
        expect(isArray).not.toBeTruthy();


        done();

    });


    it(".isFunction(fn)", function (done) {

        var Type = Divhide.Type;

        var isFn = Type.isFunction(function(){});
        expect(isFn).toBeTruthy();

        isFn = Type.isFunction(null);
        expect(isFn).not.toBeTruthy();

        isFn = Type.isFunction({});
        expect(isFn).not.toBeTruthy();

        done();

    });


    it(".isString(string)", function (done) {

        var Type = Divhide.Type;

        var isString = Type.isString("asass");
        expect(isString).toBeTruthy();

        isString = Type.isString({});
        expect(isString).not.toBeTruthy();

        done();

    });


    it(".isObject(Obj)", function (done) {

        var Type = Divhide.Type;

        var isObject = Type.isObject({});
        expect(isObject).toBeTruthy();

        isObject = Type.isObject(null);
        expect(isObject).not.toBeTruthy();

        isObject = Type.isObject("");
        expect(isObject).not.toBeTruthy();

        isObject = Type.isObject([]);
        expect(isObject).not.toBeTruthy();

        done();

    });


    it(".isNumber()", function (done) {

        var Type = Divhide.Type;

        var isNumber = Type.isNumber(1);
        expect(isNumber).toBeTruthy();

        isNumber = Type.isNumber("1.1");
        expect(isNumber).toBeTruthy();

        isNumber = Type.isNumber(null);
        expect(isNumber).not.toBeTruthy();

        isNumber = Type.isNumber("");
        expect(isNumber).not.toBeTruthy();

        isNumber = Type.isNumber("1.1a");
        expect(isNumber).not.toBeTruthy();

        isNumber = Type.isNumber({});
        expect(isNumber).not.toBeTruthy();

        isNumber = Type.isNumber([]);
        expect(isNumber).not.toBeTruthy();

        done();

    });


    it(".isDefined()", function (done) {

        var Type = Divhide.Type;

        var isDefined = Type.isDefined({ 1: 1 });
        expect(isDefined).toEqual(true);

        isDefined = Type.isDefined([1,2,3]);
        expect(isDefined).toEqual(true);

        isDefined = Type.isDefined(1);
        expect(isDefined).toEqual(true);

        isDefined = Type.isDefined(true);
        expect(isDefined).toEqual(true);

        isDefined = Type.isDefined(null);
        expect(isDefined).toEqual(false);

        isDefined = Type.isDefined(undefined);
        expect(isDefined).toEqual(false);

        done();

    });


    it(".isEmpty()", function (done) {

        var Type = Divhide.Type;

        var isEmpty = Type.isEmpty(undefined);
        expect(isEmpty).toBe(true);

        isEmpty = Type.isEmpty(null);
        expect(isEmpty).toBe(true);

        isEmpty = Type.isEmpty([]);
        expect(isEmpty).toBe(true);

        isEmpty = Type.isEmpty({});
        expect(isEmpty).toBe(true);

        isEmpty = Type.isEmpty("");
        expect(isEmpty).toBe(true);

        isEmpty = Type.isEmpty([1,2]);
        expect(isEmpty).toBe(false);

        isEmpty = Type.isEmpty({ a: 1 });
        expect(isEmpty).toBe(false);

        isEmpty = Type.isEmpty(0);
        expect(isEmpty).toBe(false);

        done();

    });


    it(".isRegExp()", function (done) {

        var Type = Divhide.Type;

        var result = Type.isRegExp(new RegExp(""));
        expect(result)
            .toBe(true);

        result = Type.isRegExp(true);
        expect(result)
            .toBe(false);

        result = Type.isRegExp("asass");
        expect(result)
            .toBe(false);

        result = Type.isRegExp({});
        expect(result)
            .toBe(false);

        result = Type.isRegExp([]);
        expect(result)
            .toBe(false);

        result = Type.isRegExp(undefined);
        expect(result)
            .toBe(false);

        result = Type.isRegExp(null);
        expect(result)
            .toBe(false);

        done();

    });


    it(".isRegExpStr()", function (done) {

        var Type = Divhide.Type;

        var result = Type.isRegExpStr(undefined);
        expect(result)
            .toBe(false);

        result = Type.isRegExpStr(null);
        expect(result)
            .toBe(false);

        result = Type.isRegExpStr({});
        expect(result)
            .toBe(false);

        result = Type.isRegExpStr(1);
        expect(result)
            .toBe(false);

        result = Type.isRegExpStr("");
        expect(result)
            .toBe(false);

        result = Type.isRegExpStr("/.*/");
        expect(result)
            .toBe(true);

        result = Type.isRegExpStr("/.*/ga");
        expect(result)
            .toBe(true);

        done();

    });

    it(".of()", function (done) {

        var Type = Divhide.Type;

        expect(Type.of({}))
            .toBe("object");

        expect(Type.of([]))
            .toBe("array");

        expect(Type.of(true))
            .toBe("boolean");

        expect(Type.of(false))
            .toBe("boolean");

        done();

    });


});
