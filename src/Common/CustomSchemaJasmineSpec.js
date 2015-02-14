'use strict';


describe("CustomSchema", function () {

    var Schema = Divhide.CustomSchema;

    beforeEach(function (done) {

        jasmine.addMatchers({
            equals: function(expected) {

                return {
                    compare: function(actual, expected) {
                        return { pass: _.isEqual(actual, expected) };
                    }
                };

            }
        });

        done();

    });


    it(".value()", function () {

        var validator = new Schema()
                        .string()
                        .default('default');

        var value = validator.value(null);
        expect(value).equals("default");

    });

    it(".errors()", function () {

        var errors = new Schema()
                        .object({ "one": 1 })
                        .errors("errors");

        expect(errors.length).equals(1);

    });

    it(".value()", function () {

        var value = new Schema()
                        .object({ "one": 0 })
                        .value({ "one": 1 });

        expect(value).equals({ "one": 1 });

    });

    it(".value() throws", function () {

        var fn = function(){
            new Schema()
                .object({ "one": 0 })
                .value({});
        };

        expect(fn).toThrow();

    });

    it("recursive", function () {

        var validator = new Schema()
                        .object({
                            "value": new Schema().string().required()
                        })
                        .optional();

        var value = validator.value({ "value": "1" });
        expect(value).equals({ "value": "1" });

    });


    it(".object({}).required().default()", function () {

        var value = new Schema()
                        .object({ "one": 0 })
                        .required()
                        .default({ "one": 1 })
                        .value();

        expect(value).equals({ "one": 1 });

    });

    it(".object({ '/regex/': ? })", function () {

        var value = new Schema()
                        .object({ "/^t/": 0 })
                        .value({ "one": 1, "two": 2, "three": 3 });

        expect(value).equals({ "two": 2, "three": 3 });

    });

    it(".object({}) min", function() {

        var fn = function(){
            var value = new Schema()
                        .object({ "/^t/": 0 })
                        .min(4)
                        .value({ "one": 1, "two": 2, "three": 3 });
        };

        expect(fn).toThrow();

    });

    it(".object({}) max", function () {

        var fn = function(){
            var value = new Schema()
                        .object({ "/^t/": 0 })
                        .max(1)
                        .value({ "one": 1, "two": 2, "three": 3 });
        };

        expect(fn).toThrow();

    });

    ///
    /// Array tests
    ///

    it(".array([ 1, 2 ])", function () {

        var value = new Schema()
                        .array([ 0, 0 ])
                        .required()
                        .value([ 1, 2 ]);

        expect(value).equals([ 1, 2 ]);

    });

    it(".array([ 1, 2 ]).repeatable()", function () {

        var value = new Schema()
                        .array([ 0, 0 ])
                        .required()
                        .repeatable()
                        .value([ 1, 2, 3, 4 ]);

        expect(value).equals([ 1, 2, 3, 4 ]);

    });

    ///
    /// Any tests
    ///

    it(".any().optional().value()", function () {

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


    it(".any().optional().default().value()", function () {

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

    ///
    /// Serialization tests
    ///

    it(".serialize()", function () {

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

    it(".object().serialize()", function () {

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

    ///
    /// Deserialization tests
    ///

    it(".object().deserialize(object)", function () {

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

    it(".array().deserialize(object)", function () {

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

    it(".boolean()", function () {

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

    it(".strict().boolean()", function () {

        var schema = new Schema().strict().boolean();

        var value = schema.value(true);
        expect(value)
            .equals(true);

        value = schema.value(false);
        expect(value)
            .equals(false);


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

    ///
    /// Compilation tests
    ///
    
    it("compiling .object() and array() should return values", function () {

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
