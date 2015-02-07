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


    it(".compile().errors()", function (done) {

        var validator = new Schema()
                        .object({ "one": 1 })
                        .compile();

        var errors = validator.errors("errors");

        expect(errors.length).equals(1);

        done();

    });


    it(".compile().value()", function (done) {

        var validator = new Schema()
                        .string()
                        .default('default')
                        .compile();

        var value = validator.value(null);

        expect(value).equals("default");

        done();

    });

    it(".errors()", function (done) {

        var errors = new Schema()
                        .object({ "one": 1 })
                        .errors("errors");

        expect(errors.length).equals(1);

        done();

    });

    it(".value()", function (done) {

        var value = new Schema()
                        .object({ "one": 0 })
                        .value({ "one": 1 });

        expect(value).equals({ "one": 1 });

        done();

    });

    it(".value() throws", function (done) {

        var fn = function(){
            new Schema()
                .object({ "one": 0 })
                .value({});
        };

        expect(fn).toThrow();

        done();

    });

    it("recursive", function (done) {

        var validator = new Schema()
                        .object({
                            "value": new Schema().string().required()
                        })
                        .optional()
                        .compile();

        var value = validator.value({ "value": "1" });

        expect(value).equals({ "value": "1" });

        done();

    });


    it(".object({}).required().default()", function (done) {

        var value = new Schema()
                        .object({ "one": 0 })
                        .required()
                        .default({ "one": 1 })
                        .value();

        expect(value).equals({ "one": 1 });

        done();

    });

    it(".object({ '/regex/': ? })", function (done) {

        var value = new Schema()
                        .object({ "/^t/": 0 })
                        .value({ "one": 1, "two": 2, "three": 3 });

        expect(value).equals({ "two": 2, "three": 3 });

        done();

    });

    it(".object({}) min", function (done) {

        var fn = function(){
            var value = new Schema()
                        .object({ "/^t/": 0 })
                        .min(4)
                        .value({ "one": 1, "two": 2, "three": 3 });
        };

        expect(fn).toThrow();

        done();

    });

    it(".object({}) max", function (done) {

        var fn = function(){
            var value = new Schema()
                        .object({ "/^t/": 0 })
                        .max(1)
                        .value({ "one": 1, "two": 2, "three": 3 });
        };

        expect(fn).toThrow();

        done();

    });

    it(".array([ 1, 2 ])", function (done) {

        var value = new Schema()
                        .array([ 0, 0 ])
                        .required()
                        .value([ 1, 2 ]);

        expect(value).equals([ 1, 2 ]);

        done();

    });

    it(".array([ 1, 2 ]).repeatable()", function (done) {

        var value = new Schema()
                        .array([ 0, 0 ])
                        .required()
                        .repeatable()
                        .value([ 1, 2, 3, 4 ]);

        expect(value).equals([ 1, 2, 3, 4 ]);

        done();

    });

    it(".any().optional().value()", function (done) {

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

        done();

    });


    it(".any().optional().default().value()", function (done) {

        var schema = new Schema()
                        .any()
                        .default("default_value")
                        .optional();

        var value = schema.value(undefined);
        expect(value).equals("default_value");

        value = schema.value(null);
        expect(value).equals("default_value");

        value = schema.value("val");
        expect(value).equals("val");

        value = schema.value(1);
        expect(value).equals(1);

        done();

    });


    it(".serialize()", function (done) {

        var schema = new Schema()
                        .any()
                        .default("default_value")
                        .max(10)
                        .optional();

        var value = schema.serialize();

        expect(value)
        .equals({
            schema: null,
            any: true,
            default: 'default_value',
            required: false,
            repeatable: false,
            validations: [{
                name: "max",
                args: [ 10 ]
            }]
        });


        done();

    });

    it(".object().serialize()", function (done) {

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
                    any: true,
                    default: undefined,
                    required: true,
                    repeatable: false,
                    validations: [  ]
                },
                two: {
                    schema: '',
                    any: false,
                    default: undefined,
                    required: true,
                    repeatable: false,
                    validations: [ { name: "max", args: [5] } ]
                }
            },
            any: false,
            default: undefined,
            required: false,
            repeatable: false,
            validations: [  ]
        });

        done();

    });

    it(".object().deserialize(object)", function (done) {

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
        }).toThrow(new Error("The maximum value allowed is 5."));

        done();

    });

    it(".array().deserialize(object)", function (done) {

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

        done();

    });

    it(".function()", function (done) {

        var schema = new Schema().function();

        var value = schema.value(function(){});

        expect(typeof(value))
            .equals("function");


        var errors = schema.errors({});
        expect(errors.length)
            .toBe(1);

        expect(errors.items[0])
            .toMatch("'function' was expected but found 'object' instead");

        done();

    });

});
