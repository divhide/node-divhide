'use strict';

describe("CustomSchema", function () {

    var Schema = Divhide.CustomSchema;

    beforeEach(function () {
        jasmine.addMatchers(window.JasmineCustomMatchers);
    });
    
    ///
    /// .value(String) integration tests
    ///
    describe('.value(String) integration tests', function(){

        it(".default() should return default value", function () {

            var validator = new Schema()
                            .string()
                            .default('default');

            var value = validator.value(null);
            expect(value).equals("default");

        });

    });

    ///
    /// .value(Object) integration tests
    ///
    describe('.value(Object) integration tests', function(){

        it(".required() should return value", function () {

            var value = new Schema()
                            .object({ "one": 0 })
                            .value({ "one": 1 });

            expect(value).equals({ "one": 1 });

        });

        it(".required() with invalid value should throw Error", function () {

            var fn = function(){
                new Schema()
                    .object({ "one": 0 })
                    .value({});
            };

            expect(fn).toThrow();

        });

        it("should support regular expression on keys", function () {

            var value = new Schema()
                            .object({ "/^t/": 0 })
                            .value({ "one": 1, "two": 2, "three": 3 });

            expect(value).equals({ "two": 2, "three": 3 });

        });

        it("if #keys<min() should throw Error", function() {

            var fn = function(){
                var value = new Schema()
                            .object({ "/^t/": 0 })
                            .min(4)
                            .value({ "one": 1, "two": 2, "three": 3 });
            };

            expect(fn).toThrow();

        });

        it("if #keys>max() should throw Error", function() {

            var fn = function(){
                var value = new Schema()
                            .object({ "/^t/": 0 })
                            .max(1)
                            .value({ "one": 1, "two": 2, "three": 3 });
            };

            expect(fn).toThrow();

        });

    });

    ///
    /// .value(Array) integration tests
    ///
    describe('.value(Array) integration tests', function(){

        it("should return value", function () {

            var value = new Schema()
                            .array([ 0, 0 ])
                            .required()
                            .value([ 1, 2 ]);

            expect(value).equals([ 1, 2 ]);

        });

        it(".repeatable() should return value", function () {

            var value = new Schema()
                            .array([ 0, 0 ])
                            .required()
                            .repeatable()
                            .value([ 1, 2, 3, 4 ]);

            expect(value).equals([ 1, 2, 3, 4 ]);

        });

    });

    ///
    /// .value(Any) integration tests
    ///
    describe('.value(Any) integration tests', function(){

        it(".optional().value() should return value or null", function () {

            var schema = new Schema()
                            .any()
                            .optional();

            var value = schema.value(undefined);
            expect(value).equals(null);

            value = schema.value(null);
            expect(value).equals(null);

            value = schema.value("val");
            expect(value).equals("val");

            value = schema.value(1);
            expect(value).equals(1);

        });

        it(".optional().default() shouldn't return default value", function () {

            var schema = new Schema()
                            .any()
                            .default("default_value")
                            .optional();

            var value = schema.value(undefined);
            expect(value).equals(null);

            value = schema.value(null);
            expect(value).equals(null);

            value = schema.value("val");
            expect(value).equals("val");

            value = schema.value(1);
            expect(value).equals(1);

        });

    });

    ///
    /// .value(Boolean) integration tests
    ///
    describe('.value(Boolean) integration tests', function(){

        it("should return a value", function () {

            var schema = new Schema().boolean();

            var value = schema.value(true);
            expect(value)
                .equals(true);

            value = schema.value(false);
            expect(value)
                .equals(false);

            value = schema.value("false");
            expect(value)
                .equals(false);

            var errors = schema.errors({});
            expect(errors.length)
                .toBe(1);

            expect(errors.items[0])
                .toMatch("'boolean' was expected but found 'object' instead");

        });

        it(".strict() with incompatible types should throw an error", function () {

            var schema = new Schema().strict().boolean();

            var errors = schema.errors("false");
            expect(errors.length)
                .toBe(1);

            expect(errors.items[0])
                .toMatch("'boolean' was expected but found 'string' instead");


            errors = schema.errors(1);
            expect(errors.length)
                .toBe(1);

            expect(errors.items[0])
                .toMatch("'boolean' was expected but found 'number' instead");

        });

    });

    ///
    /// .value(Boolean) integration tests
    ///
    describe('.value(function) integration tests', function(){

        it(".function()", function () {

            var schema = new Schema().function();

            var value = schema.value(function(){});

            expect(typeof(value))
                .equals("function");


            var errors = schema.errors({});
            expect(errors.length)
                .toBe(1);

            expect(errors.items[0])
                .toMatch("'function' was expected but found 'object' instead");

        });

    });
    
    ///
    /// .errors integration tests
    ///
    describe('.errors() integration tests', function(){

        it("should return errors", function () {

            var errors = new Schema()
                            .object({ "one": 1 })
                            .errors("errors");

            expect(errors.length).equals(1);

        });

    });

    ///
    /// .serialize() integration tests
    ///
    describe('.serialize() integration tests', function(){

        it(".any() should return a json structure", function () {

            var schema = new Schema()
                            .any()
                            .default("default_value")
                            .max(10)
                            .optional();

            var value = schema.serialize();

            expect(value)
            .equals({
                schema: null,
                strict: false,
                any: true,
                default: 'default_value',
                required: false,
                repeatable: false,
                validations: [{
                    name: "max",
                    args: [ 10 ]
                }]
            });

        });

        it(".object() should return a json structure", function () {

            var schema = new Schema()
                            .object({
                                "one": new Schema().any(),
                                "two": new Schema().optional().string().max(5)
                            })
                            .optional();

            var value = schema.serialize();

            expect(value)
            .equals({
                schema: {
                    one: {
                        schema: null,
                        strict: false,
                        any: true,
                        default: undefined,
                        required: true,
                        repeatable: false,
                        validations: [  ]
                    },
                    two: {
                        schema: '',
                        strict: false,
                        any: false,
                        default: undefined,
                        required: true,
                        repeatable: false,
                        validations: [ { name: "max", args: [5] } ]
                    }
                },
                strict: false,
                any: false,
                default: undefined,
                required: false,
                repeatable: false,
                validations: [  ]
            });

        });

    });

    ///
    /// .serialize() integration tests
    ///
    describe('.deserialize() integration tests', function(){

        it("object() should return a Schema", function () {

            var schema = new Schema()
                            .object({
                                "one": new Schema().any(),
                                "two": new Schema().optional().string().max(5)
                            })
                            .optional();

            /// deserialize and serialize back
            var serialized = schema.serialize();
            schema = new Schema().deserialize(serialized);

            /// assert value

            var value = schema.value({
                "one": 1,
                "two": "two",
                "three": "three"
            });

            expect(value)
                .equals({ "one": 1, "two": "two" });

            /// assertion with exception

            expect(function(){
                schema.value({ "one": 1, "two": "long string" });
            }).toThrowError("The maximum value allowed is 5.");

        });

        it(".array() should return a valid Schema", function () {

            var schema = new Schema()
                            .array([
                                new Schema().any(),
                                new Schema().optional().string().max(5)
                            ]);

            /// deserialize and serialize back
            var serialized = schema.serialize();
            schema = new Schema().deserialize(serialized);

            /// assert value

            var value = schema.value(["any", "str"]);

            expect(value)
                .equals(["any", "str"]);

        });

    });
    
    ///
    /// Compile() tests
    ///
    describe('.compile() integration tests', function(){

        it(".value() should return a value", function () {

            /// get the schema
            var schema = new Schema().object({
                data: new Schema().array([ "" ]).repeatable().max(10)
            }).required();

            /// apply the schema to the value
            var value = schema.value({
                data: [ 1, 2, 3, 4, 5, 6],
                timestamp: "1404373579473"
            });

            expect(value).equals({
                data: [ '1', '2', '3', '4', '5', '6' ]
            });

        });

    });

    
});
