'use strict';

describe("SubModules.Schema.Mixins.SchemaExecution", function () {

    var SchemaDefinition = Divhide.SubModules.Schema.SchemaDefinition;

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

    ///
    /// Literal validation tests
    ///

    it(".value() should apply default value", function () {

        var schema = new SchemaDefinition({
            schema : "",
            default: "default",
            required: true
        });

        /// test default value
        var result = schema.execute();
        expect(result.value).equals("default");
        expect(result.errors.length).equals(0);

    });

    ///
    /// Any validation rules
    ///
    
    it(".any() required=true should ignore schema definition", function () {

        var schema = new SchemaDefinition({
            schema : { "one": 1 },
            default: "default",
            required: true,
            any: true
        });

        /// test value with different schema
        var result = schema.execute("");
        expect(result.value).equals("");
        expect(result.errors.length).equals(0);

        /// test value with different schema
        result = schema.execute([]);
        expect(result.value).equals([]);
        expect(result.errors.length).equals(0);

    });

    it(".any() required=true should apply default value", function () {

        var schema = new SchemaDefinition({
            default: "default",
            required: true,
            any: true
        });

        /// test undefined value
        var result = schema.execute();
        expect(result.value).equals("default");
        expect(result.errors.length).equals(0);

        /// test defined value
        result = schema.execute({});
        expect(result.value).equals({});
        expect(result.errors.length).equals(0);

    });

    it(".any() required=false should not apply default value", function () {

        var schema = new SchemaDefinition({
            default: "default",
            required: false,
            any: true
        });

        /// test undefined value
        var result = schema.execute();
        expect(result.value).equals(null);
        expect(result.errors.length).equals(0);

        /// test defined value
        result = schema.execute({});
        expect(result.value).equals({});
        expect(result.errors.length).equals(0);

    });

    /// 
    /// Object validation tests
    /// 

    it(".object().required().default() empty values should return default value", function () {

        var schema = new SchemaDefinition({
            schema : {
                "val": new SchemaDefinition({ schema: "", required: true })
            },
            default: { "val": "default" },
            required: true
        });

        /// test default value
        var result = schema.execute({});
        expect(result.value).equals({ "val": "default" });
        expect(result.errors.length).equals(0);

    });

    it(".object().required().default() invalid types should return default value", function () {

        var schema = new SchemaDefinition({
            schema : {
                "val": new SchemaDefinition({ schema: "", required: true })
            },
            default: { "val": "default" },
            required: true
        });

        /// test default value
        var result = schema.execute({ "val": [1, 2] });
        expect(result.value).equals({ "val": "default" });
        expect(result.errors.length).equals(0);

    });

    it(".object().required().default() should return value", function () {

        var schema = new SchemaDefinition({
            schema : {
                "val": new SchemaDefinition({ schema: "", required: true })
            },
            default: { "val": "default" },
            required: true
        });

        /// test valid value
        var result = schema.execute({ "val": "value", "val2": "value2" });
        expect(result.value).equals({ "val": "value" });
        expect(result.errors.length).equals(0);

    });

    it(".object().required().default() with optional should return value", function () {

        var schema = new SchemaDefinition({
            schema : {
                "optional": new SchemaDefinition({ schema: "", required: false }),
            },
            default: { "val": "default" },
            required: true
        });

        /// test empty result
        var result = schema.execute({});
        expect(result.value).equals({});
        expect(result.errors.length).equals(0);

        /// test result 
        result = schema.execute({ "optional": "val" });
        expect(result.value).equals({ "optional": "val" });
        expect(result.errors.length).equals(0);

    });

    ///
    /// Array validation tests
    ///

    it(".array().default() invalid should return default", function () {

        var schema = new SchemaDefinition({
            schema : [
                new SchemaDefinition({ schema: "", required: true }),
                new SchemaDefinition({ schema: "", required: true })
            ],
            required: true,
            default: [ 1, 2 ]
        });

        /// test null (will fail on required)
        var result = schema.execute(null);
        expect(result.value).equals([ '1', '2' ]);
        expect(result.errors.length).equals(0);

        /// test empty
        /// TODO. make sense of this. If it's null the default_value is coerced
        /// otherwise it will not.
        result = schema.execute([]);
        expect(result.value).equals([ '1', '2' ]);
        expect(result.errors.length).equals(0);

    });

    it(".array().repeatable() should return value", function () {

        var schema = new SchemaDefinition({
            schema : [
                new SchemaDefinition({ schema: "", required: true })
            ],
            repeatable: true
        });

        var result = schema.execute(["1", "2", "3"]);
        expect(result.value).equals(["1", "2", "3"]);
        expect(result.errors.length).equals(0);

    });

    it(".array().repeatable() should return error", function () {

        var schema = new SchemaDefinition({
            schema : [
                new SchemaDefinition({ schema: "", required: true }),
                new SchemaDefinition({ schema: "", required: true })
            ],
            repeatable: true
        });

        var result = schema.execute([]);
        expect(result.value).equals([]);
        expect(result.errors.length).equals(1);
        expect(result.errors.items[0].toString())
            .equals("Expected list length to be multiple of 2 but found length of 0.");

    });


    it(".array() with optional items should return null on them", function () {

        var schema = new SchemaDefinition({
            schema : [
                new SchemaDefinition({ schema: 0, required: false }),
                new SchemaDefinition({ schema: "", required: true })
            ],
            required: true
        });

        var result = schema.execute([ null, "a" ]);
        expect(result.value).equals([ null, "a" ]);
        expect(result.errors.length).equals(0);

    });

});

