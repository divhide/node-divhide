'use strict';

describe("Divhide.Obj", function () {

    beforeEach(function () {
        jasmine.addMatchers(window.JasmineCustomMatchers);
    });


    it("Divhide.Specs.ObjExample", function () {
        Divhide.Specs.ObjExample();
    });

    /**
     *
     * Tests related to Obj.stringify() function
     *
     */
    describe("stringify", function () {

        /**
         *
         * Test toString() with a literal as argument
         *
         */
        describe("stringify(literal)", function(){

            it("String should return a valid string", function () {

                var val = Divhide.Obj.stringify("Oscar");
                expect(val).toBe("Oscar");

            });

            it("Number should return a valid string", function () {

                var val = Divhide.Obj.stringify(1);
                expect(val).toBe("1");

            });

            it("null should return a valid string", function () {

                var val = Divhide.Obj.stringify(null);
                expect(val).toBe("null");

            });

            it("undefined should return a valid string", function () {

                var val = Divhide.Obj.stringify(undefined);
                expect(val).toBe("undefined");

            });

        });

        /**
         *
         * Test toString() with an object as the argument
         *
         */
        describe("stringify(obj)", function(){

            it("one level object should return a valid string", function () {

                var val = Divhide.Obj.stringify({
                    "firstName": "Oscar",
                    "lastName": "Brito"
                });

                expect(val).toBe("{firstName: Oscar, lastName: Brito}");

            });

            it("two level object should return a valid string", function () {

                var val = Divhide.Obj.stringify({
                    "firstName": {
                        "value": "Oscar"
                    },
                    "lastName": {
                        "value": "Brito"
                    }
                });

                expect(val).toBe("{firstName: {value: Oscar}, lastName: {value: Brito}}");

            });

        });

        /**
         *
         * Test toString() with an array as argument
         *
         */
        describe("stringify(array)", function(){

            it("one level array should return a valid string", function () {

                var val = Divhide.Obj.stringify([
                    "one",
                    "two"
                ]);

                expect(val).toBe("[one, two]");

            });

            it("complex array should return a valid string", function () {

                var val = Divhide.Obj.stringify(["one", ["two"]]);
                expect(val).toBe("[one, [two]]");

            });

        });

        /**
         *
         * Test toString() with different combination of
         * arguments.
         *
         */
        describe("stringify(*)", function(){

            it("array with complex combination should return a valid string", function () {

                var val = Divhide.Obj.stringify([
                    "one",
                    {
                        "2": "two",
                        "3": "three",
                        4: [4]
                    },
                    [ 5 ]
                ]);

                expect(val).toBe("[one, {2: two, 3: three, 4: [4]}, [5]]");

            });

            it("object with complex combination should return a valid string", function () {

                var val = Divhide.Obj.stringify({
                    1: 1,
                    2: [ 2 ],
                    3: {
                        "value": "3"
                    }
                });

                expect(val).toBe("{1: 1, 2: [2], 3: {value: 3}}");

            });

        });

    });


});