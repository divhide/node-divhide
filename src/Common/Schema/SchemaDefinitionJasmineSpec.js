'use strict';

describe("SubModules.Schema.SchemaDefinition", function () {

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

    it("ctor([])", function () {

        var c = new SchemaDefinition({
            schema : [ 1, 2 ],
            default: [],
            required: true,
            repeatable: false
        });

        var schema = new SchemaDefinition({
            schema : [
                new SchemaDefinition({ schema: 2, required: true }),
                new SchemaDefinition({ schema: 1, required: true })
            ],
            default: [],
            required: true,
            repeatable: false
        });

        expect(schema).equals(c);

    });

    it("ctor({})", function () {

        var c = new SchemaDefinition({
            schema : { one: 1, two: 2 },
            required: true,
            repeatable: false
        });

        var schema = new SchemaDefinition({
            schema : {
                "one": new SchemaDefinition({ schema: 0, required: true }),
                "two": new SchemaDefinition({ schema: 0, required: true })
            },
            required: true,
            repeatable: false
        });

        expect(schema).equals(c);

    });

    it("ctor('')", function () {

        var expected = new SchemaDefinition({
            schema : '',
            required: true,
            repeatable: false
        });

        var schema = new SchemaDefinition({ schema: '0' });

        expect(schema).equals(expected);


    });

    it("ctor(0)", function () {

        var expected = new SchemaDefinition({
            schema : 0,
            required: true,
            repeatable: false
        });

        var schema = new SchemaDefinition({ schema: 1 });

        expect(schema).equals(expected);

    });


});

