'use strict';

describe("SubModules.Schema.Utils.CompilationSpec", function () {

    var SchemaDefinition    = Divhide.SubModules.Schema.Entity.SchemaDefinition,
        Compilation         = Divhide.SubModules.Schema.Utils.Compilation;


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

    it("compile(SchemaDefinition)", function (done) {

        var c = new SchemaDefinition({
            schema : { one: 1 },
            default: { one: 2 }
        });

        var schema = Compilation.compile(c);

        expect(schema).equals(c);

        done();

    });

    it("compile([])", function (done) {

        var c = new SchemaDefinition({
            schema : [ 1, 2 ],
            default: [],
            required: true,
            repeatable: false
        });

        var expected = new SchemaDefinition({
            schema : [
                new SchemaDefinition({ schema: 0, required: true }),
                new SchemaDefinition({ schema: 0, required: true })
            ],
            required: true,
            repeatable: false
        });

        var schema = Compilation.compile(c.schema);

        expect(schema).equals(expected);
        expect(schema).not.equals(c);

        done();

    });

    it("compile({})", function (done) {

        var c = new SchemaDefinition({
            schema : { one: 1, two: 2 },
            default: {},
            required: true,
            repeatable: false
        });

        var expected = new SchemaDefinition({
            schema : {
                "one": new SchemaDefinition({ schema: 0, required: true }),
                "two": new SchemaDefinition({ schema: 0, required: true })
            },
            required: true,
            repeatable: false
        });

        var schema = Compilation.compile(c.schema);

        expect(schema).equals(expected);
        expect(schema).not.equals(c);

        done();

    });

    it("compile('')", function (done) {

        var expected = new SchemaDefinition({
            schema : '',
            required: true,
            repeatable: false
        });

        var schema = Compilation.compile('0');

        expect(schema).equals(expected);

        done();

    });

    it("compile(0)", function (done) {

        var expected = new SchemaDefinition({
            schema : 0,
            required: true,
            repeatable: false
        });

        var schema = Compilation.compile(1);

        expect(schema).equals(expected);

        done();

    });


});

