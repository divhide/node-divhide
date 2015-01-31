    'use strict';


describe("Schema", function () {

    var Schema  = Divhide.Schema;

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

    it("Divhide.Specs.SchemaOverview", function (done) {

        Divhide.Specs.SchemaOverview();
        done();

    });

    it("Divhide.Specs.SchemaStringExample", function (done) {

        Divhide.Specs.SchemaStringExample();
        done();

    });

    it("Divhide.Specs.SchemaNumberExample", function (done) {

        Divhide.Specs.SchemaNumberExample();
        done();

    });

    it("Divhide.Specs.SchemaAnyExample", function (done) {

        Divhide.Specs.SchemaAnyExample();
        done();

    });

    it("Divhide.Specs.SchemaObjectExample", function (done) {

        Divhide.Specs.SchemaObjectExample();
        done();

    });

    it("Divhide.Specs.SchemaArrayExample", function (done) {

        Divhide.Specs.SchemaArrayExample();
        done();

    });

    it("Divhide.Specs.SchemaSerializationExample", function (done) {

        Divhide.Specs.SchemaSerializationExample();
        done();

    });

});
