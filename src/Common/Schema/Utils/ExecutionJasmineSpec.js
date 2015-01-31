'use strict';

describe("SubModules.Schema.Utils.ExecutionSpec", function () {

    var SchemaDefinition    = Divhide.SubModules.Schema.Entity.SchemaDefinition,
        Execution           = Divhide.SubModules.Schema.Utils.Execution;


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

    it(".execute({}, {})", function (done) {

        var schema = new SchemaDefinition({
            schema : {
                "val": new SchemaDefinition({ schema: "", required: true })
            },
            default: { "val": "val" },
            required: true
        });

        var result = Execution.execute(schema, { "val": "value" });

        expect(result.value).equals({ "val": "value" });
        expect(result.errors.length).equals(0);

        done();

    });


    it(".execute({}, {}) default", function (done) {

        var schema = new SchemaDefinition({
            schema : {
                "val": new SchemaDefinition({ schema: "", required: true })
            },
            default: { "val": "default" },
            required: true
        });

        var result = Execution.execute(schema, {});

        expect(result.value).equals({ "val": "default" });
        expect(result.errors.length).equals(0);

        done();

    });

    it(".execute({}, {}) optional key", function (done) {

        var schema = new SchemaDefinition({
            schema : {
                "optional": new SchemaDefinition({ schema: "", required: false }),
            },
            default: { "val": "default" },
            required: true
        });

        var result = Execution.execute(schema, {});

        expect(result.value).equals({});
        expect(result.errors.length).equals(0);

        done();

    });

    it(".execute({}, {}) optional returns value", function (done) {

        var schema = new SchemaDefinition({
            schema : {
                "optional": new SchemaDefinition({ schema: "", required: false }),
            },
            default: { "val": "default" },
            required: true
        });

        var result = Execution.execute(schema, { "optional": "val" });

        expect(result.value).equals({ "optional": "val" });
        expect(result.errors.length).equals(0);

        done();

    });

    it(".execute({}, {}) not compiled should return errors", function (done) {

        var schema = { "val": "val" };

        var fn = function(){
            Execution.execute(schema, { "val": "value" });
        };

        expect(fn).toThrow();

        done();

    });

    it(".execute(?, [])", function (done) {

        var schema = new SchemaDefinition({
            schema : [
                new SchemaDefinition({ schema: "", required: true })
            ],
            required: true,
            default: [ 1, 2 ],
            repeatable: true
        });


        var result = Execution.execute(schema, ["1", "2", "3"]);

        expect(result.value).equals(["1", "2", "3"]);
        expect(result.errors.length).equals(0);

        ///

        result = Execution.execute(schema, {});
        expect(result.value)
            .equals([ 1, 2 ]);
        expect(result.errors.length)
            .equals(0);


        done();

    });


    it(".execute([], []) optional items", function (done) {

        var schema = new SchemaDefinition({
            schema : [
                new SchemaDefinition({ schema: 0, required: false }),
                new SchemaDefinition({ schema: "", required: true })
            ],
            required: true
        });

        var result = Execution.execute(schema, [ null, "a" ]);

        expect(result.value).equals([ null, "a" ]);
        expect(result.errors.length).equals(0);

        done();

    });


    it(".execute() required=false default=undefined", function (done) {

        var schema = new SchemaDefinition({
            schema : [
                new SchemaDefinition({ schema: "", required: true })
            ],
            required: false,
            default: undefined,
            repeatable: true
        });

        var result = Execution.execute(schema, null);

        expect(result.value).equals(null);
        expect(result.errors.length).equals(0);

        done();

    });


});

