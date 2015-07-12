'use strict';

describe("Schema.Mixins.SchemaExecution", function () {

    var SchemaDefinition = Divhide.SubModules.Schema.SchemaDefinition;

    beforeEach(function () {
        jasmine.addMatchers(window.JasmineCustomMatchers);
    });
    
    describe('execute() .string()', function(){

        it(".string().default().required() should return default value and no errors", function () {

            var schema = new SchemaDefinition({
                schema : "",
                default: "default",
                required: true
            });

            /// test default value
            var result = schema.execute();
            expect(result.getValue()).equals("default");
            expect(result.isValid()).equals(true);

        });

    });

    describe('execute() .any()', function(){

        it(".any().default().required() should ignore default value", function () {

            var schema = new SchemaDefinition({
                schema : { "one": 1 },
                default: "default",
                required: true,
                any: true
            });

            /// test value with different schema
            var result = schema.execute("");
            expect(result.getValue()).equals("");
            expect(result.isValid()).equals(true);

            /// test value with different schema
            result = schema.execute([]);
            expect(result.getValue()).equals([]);
            expect(result.isValid()).equals(true);

        });

        it(".any().default().required() should return default value if value is null", function () {

            var schema = new SchemaDefinition({
                default: "default",
                required: true,
                any: true
            });

            /// test undefined value
            var result = schema.execute();
            expect(result.getValue()).equals("default");
            expect(result.isValid()).equals(true);

        });

    });

    /// 
    /// Object validation tests
    ///
    describe('execute() .object()', function(){

        it(".required().default() should return value", function () {

            var schema = new SchemaDefinition({
                schema : {
                    "val": new SchemaDefinition({ schema: "", required: true })
                },
                default: { "val": "default" },
                required: true
            });

            /// test valid value
            var result = schema.execute({ "val": "value", "val2": "value2" });
            expect(result.getValue()).equals({ "val": "value" });
            expect(result.isValid()).equals(true);

        });

        it(".required().default() empty object should return default value", function () {

            var schema = new SchemaDefinition({
                schema : {
                    "val": new SchemaDefinition({ schema: "", required: true })
                },
                default: { "val": "default" },
                required: true
            });

            /// test default value
            var result = schema.execute({});
            expect(result.getValue()).equals({ "val": "default" });
            expect(result.isValid()).equals(true);

        });

        it(".required().default() invalid type should return default value", function () {

            var schema = new SchemaDefinition({
                schema : {
                    "val": new SchemaDefinition({ schema: "", required: true })
                },
                default: { "val": "default" },
                required: true
            });

            /// test default value
            var result = schema.execute({ "val": [1, 2] });
            expect(result.getValue()).equals({ "val": "default" });
            expect(result.isValid()).equals(true);

        });

        it(".required().default() with optional should return empty object", function () {

            var schema = new SchemaDefinition({
                schema : {
                    "optional": new SchemaDefinition({ schema: "", required: false }),
                },
                default: { "val": "default" },
                required: true
            });

            /// test empty result
            var result = schema.execute({});
            expect(result.getValue()).equals({});
            expect(result.isValid()).equals(true);

            /// test result 
            result = schema.execute({ "optional": "val" });
            expect(result.getValue()).equals({ "optional": "val" });
            expect(result.isValid()).equals(true);

        });

        it(".required().default() with optional should return object", function () {

            var schema = new SchemaDefinition({
                schema : {
                    "optional": new SchemaDefinition({ schema: "", required: false }),
                },
                default: { "val": "default" },
                required: true
            });

            /// test empty result
            var result = schema.execute({});
            expect(result.getValue()).equals({});
            expect(result.isValid()).equals(true);

            /// test result 
            result = schema.execute({ "optional": "val" });
            expect(result.getValue()).equals({ "optional": "val" });
            expect(result.isValid()).equals(true);

        });


    });
    
    
    /// 
    /// Array validation tests
    ///
    describe('execute() .array()', function(){

        it(".required().default() should return default value", function () {

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
            expect(result.getValue()).equals([ '1', '2' ]);
            expect(result.isValid()).equals(true);

            /// test empty
            result = schema.execute([]);
            expect(result.getValue()).equals([ '1', '2' ]);
            expect(result.isValid()).equals(true);

        });

        it(".repeatable() should return values", function () {

            var schema = new SchemaDefinition({
                schema : [
                    new SchemaDefinition({ schema: "", required: true })
                ],
                repeatable: true
            });

            var result = schema.execute(["1", "2", "3"]);
            expect(result.getValue()).equals(["1", "2", "3"]);
            expect(result.isValid()).equals(true);

        });

        it(".repeatable() with non-multiple should return error", function () {

            var schema = new SchemaDefinition({
                schema : [
                    new SchemaDefinition({ schema: "", required: true }),
                    new SchemaDefinition({ schema: "", required: true })
                ],
                repeatable: true
            });

            var result = schema.execute([]);
            expect(result.getValue())
                .equals([]);
            
            expect(result.isValid())
                .equals(false);

            expect(result.getErrors().items[0].toString())
                .equals("Expected list length to be multiple of 2 but found length of 0.");

        });


        it("with optional items should return null on them", function () {

            var schema = new SchemaDefinition({
                schema : [
                    new SchemaDefinition({ schema: 0, required: false }),
                    new SchemaDefinition({ schema: "", required: true })
                ],
                required: true
            });

            var result = schema.execute([ null, "a" ]);
            expect(result.getValue())
                .equals([ null, "a" ]);
            
            expect(result.isValid())
                .equals(true);

        });

    });
    

});

