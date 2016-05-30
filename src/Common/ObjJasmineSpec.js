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
     * Tests for Obj.stringify()
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
                expect("\"Oscar\"").toBe(val);

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

            it("empty object should return a valid string", function () {

                var val = Divhide.Obj.stringify({}, { space: 0 });
                expect(val).toBe("{}");

            });

            it("one level object should return a valid string", function () {

                var val = Divhide.Obj.stringify({
                    "firstName": "Oscar",
                    "lastName": "Brito"
                }, { space: 0 });

                expect(val)
                    .toBe("{\"firstName\":\"Oscar\",\"lastName\":\"Brito\"}");

            });

            it("two level object should return a valid string", function () {

                var val = Divhide.Obj.stringify({
                    "firstName": {
                        "value": "Oscar"
                    },
                    "lastName": {
                        "value": "Brito"
                    }
                }, { space: 0 });

                expect(val)
                    .toBe("{\"firstName\":{\"value\":\"Oscar\"},\"lastName\":{\"value\":\"Brito\"}}");

            });

            it("with identation should return a valid string", function () {

                var val = Divhide.Obj.stringify({
                    "other": {},
                    "firstName": {
                        "value": "Oscar"
                    }
                }, { space: 2 });

                expect(val).toBe("{\n" +
                    "  \"other\": {},\n" +
                    "  \"firstName\": {\n" +
                    "    \"value\": \"Oscar\"\n" +
                    "  }\n" +
                    "}");
            });

        });

        /**
         *
         * Test toString() with an array as argument
         *
         */
        describe("stringify(array)", function(){

            it("empty array should return a valid string", function () {

                var val = Divhide.Obj.stringify([], { space: 0 });
                expect(val).toBe("[]");

            });

            it("one level array should return a valid string", function () {

                var val = Divhide.Obj.stringify([
                    "one",
                    "two",
                    3
                ], { space: 0 });

                expect(val).toBe("[\"one\",\"two\",3]");

            });

            it("complex array should return a valid string", function () {

                var val = Divhide.Obj.stringify(
                    ["one", ["two"]],
                    { space: 0 });

                expect(val).toBe("[\"one\",[\"two\"]]");

            });

            it("with identation should return a valid string", function () {

                var val = Divhide.Obj.stringify([
                    1,
                    [],
                    [ 2, 3 ],
                ], { space: 2 });

                expect(val).toBe(
                    "[\n" +
                    "  1,\n" +
                    "  [],\n" +
                    "  [\n" +
                    "    2,\n" +
                    "    3\n" +
                    "  ]\n" +
                    "]");
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
                ], { space: 0 });

                expect(val)
                    .toBe("[\"one\",{\"2\":\"two\",\"3\":\"three\",\"4\":[4]},[5]]");

            });

            it("object with complex combination should return a valid string", function () {

                var val = Divhide.Obj.stringify({
                    1: 1,
                    2: [ 2 ],
                    3: {
                        "value": "3"
                    }
                }, { space: 0 });

                expect(val)
                    .toBe("{\"1\":1,\"2\":[2],\"3\":{\"value\":\"3\"}}");

            });

            it("array with identation should return a valid string", function () {

                var val = Divhide.Obj.stringify([
                    {
                        name: "Oscar",
                        age: 30,
                        tags: [ "tag1", "tag2" ]
                    },
                    {
                        name: "Filipe",
                        age: 31
                    },
                ], { space: 2 });

                expect(val).toBe(
                    "[\n" +
                    "  {\n" +
                    "    \"name\": \"Oscar\",\n" +
                    "    \"age\": 30,\n" +
                    "    \"tags\": [\n" +
                    "      \"tag1\",\n" +
                    "      \"tag2\"\n" +
                    "    ]\n" +
                    "  },\n" +
                    "  {\n" +
                    "    \"name\": \"Filipe\",\n" +
                    "    \"age\": 31\n" +
                    "  }\n" +
                    "]");
            });

        });

        /**
         * Test stringify() annotations
         */
        describe("annotate", function(){

            it("literal should return a valid string", function(){

                var val = Divhide.Obj.stringify(1, {
                    space: 2,
                    annotate: function(value, info){
                        return {
                            before: "-> ",
                            after: " /* A value */"
                        };
                    }
                });

                expect(val).toBe("-> 1 /* A value */");

            });

            it("object should return a valid string", function(){

                var val = Divhide.Obj.stringify({
                    name: "Oscar",
                    age: 30
                }, {
                    space: 2,
                    annotate: function(value, info){
                        return {
                            after: (value instanceof Object) ? " /* The one! */" : null
                        };
                    }
                });

                expect(val).toBe(
                    "{\n" +
                    "  \"name\": \"Oscar\",\n" +
                    "  \"age\": 30\n" +
                    "} /* The one! */");
            });

            it("object keys should return a valid string", function(){

                var val = Divhide.Obj.stringify({
                    name: "Oscar",
                    age: 30
                }, {
                    space: 2,
                    annotate: function(value, info){
                        return {
                            before: (value == "Oscar") ? "/* The name */ " : null,
                            after: (value == "Oscar") ? " /* is so cool */" : null
                        };
                    }
                });

                expect(val).toBe(
                    "{\n" +
                    "  \"name\": /* The name */ \"Oscar\", /* is so cool */\n" +
                    "  \"age\": 30\n" +
                    "}");

            });

            it("array should return a valid string", function(){

                var val = Divhide.Obj.stringify([{
                    name: "Oscar",
                    age: 30
                }], {
                    space: 2,
                    annotate: function(value, info){
                        return {
                            after: (value instanceof Array) ? " /* The one! */" : null
                        };
                    }
                });

                expect(val).toBe(
                    "[\n" +
                    "  {\n" +
                    "    \"name\": \"Oscar\",\n" +
                    "    \"age\": 30\n" +
                    "  }\n" +
                    "] /* The one! */");

            });

            it("array item should return a valid string", function(){

                var val = Divhide.Obj.stringify([{
                    name: "Oscar",
                    age: 30
                }], {
                    space: 2,
                    annotate: function(value, info){
                        return {
                            after: (Divhide.Type.isObject(value)) ? " /* The one! */" : null
                        };
                    }
                });

                expect(val).toBe(
                    "[\n" +
                    "  {\n" +
                    "    \"name\": \"Oscar\",\n" +
                    "    \"age\": 30\n" +
                    "  } /* The one! */\n" +
                    "]");
            });

        });

    });

});