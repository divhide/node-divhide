'use strict';

describe("SubModules.Schema.Entity.SchemaDefinitionSpec", function () {

    var SchemaDefinition = Divhide.SubModules.Schema.Entity.SchemaDefinition;

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

    it(".ctor() defaults", function (done) {

        var c = new SchemaDefinition({
            schema : { one: 1 },
            default: { one: 2 }
        });

        expect(c.schema).equals({ one: 1 });
        expect(c.default).equals({ one: 2 });
        expect(c.required).equals(true);
        expect(c.repeatable).equals(false);
        expect(c.validations).equals([]);

        done();

    });

    it(".ctor", function (done) {

        var c = new SchemaDefinition({
            schema : { one: 1 },
            default: { one: 2 },
            required: true,
            repeatable: true
        });

        expect(c.schema).equals({ one: 1 });
        expect(c.default).equals({ one: 2 });
        expect(c.required).equals(true);
        expect(c.repeatable).equals(true);

        done();

    });

    it(".value()", function (done) {

        var c = new SchemaDefinition({
            schema : { two: 2 }
        });

        var result = c.value({ three: 3 });

        expect(result.value).equals({ three: 3 });
        expect(result.errors.length).equals(0);

        done();

    });

    it(".default().value()", function (done) {

        var c = new SchemaDefinition({
            schema : { one: 0 },
            default: { one: 1 }
        });

        var result = c.value(undefined);

        expect(result.value).equals({ one: 1 });
        expect(result.errors.length).equals(0);


        result = c.value(null);

        expect(result.value).equals({ one: 1 });
        expect(result.errors.length).equals(0);


        done();

    });

    it(".default().optional().value()", function (done) {

        var c = new SchemaDefinition({
            schema : { one: 0 },
            default: { one: 1 },
            required: false
        });

        var result = c.value(undefined);

        expect(result.value).equals({ one: 1 });
        expect(result.errors.length).equals(0);

        result = c.value(null);

        expect(result.value).equals({ one: 1 });
        expect(result.errors.length).equals(0);


        done();

    });

    it(".required().value()", function (done) {

        var c = new SchemaDefinition({
            schema : { one: 0 },
            required: true
        });

        var result = c.value(undefined);

        expect(result.value).equals(null);
        expect(result.errors.length).equals(1);


        result = c.value(null);

        expect(result.value).equals(null);
        expect(result.errors.length).equals(1);


        done();

    });


    it(".value() type", function (done) {

        var c = new SchemaDefinition({
            schema : { one: 0 }
        });

        var result = c.value(1);

        expect(result.value).equals(1);
        expect(result.errors.length).equals(1);


        done();

    });

    it(".value() validations", function (done) {

        var c = new SchemaDefinition({
            schema : ""
        });

        c.validations.push({ name: "validation1" });
        c.validations.push({ name: "validation2" });

        var result = c.value("valerror", {
            validation1: function(val){ throw new Error(val); },
            validation2: function(val){ throw new Error("VALIDATION_REQUIRED"); },
        });

        expect(result.value).equals("valerror");
        expect(result.errors.length).equals(2);
        expect(result.errors.items[0].message).equals("valerror");
        expect(result.errors.items[1].message).equals("Value is required.");


        done();

    });

    it(".value() normalize numbers", function (done) {

        var c, result;

        c = new SchemaDefinition({ schema : 0 });
        result = c.value(1);
        expect(result.value).equals(1);

        c = new SchemaDefinition({ schema : 0 });
        result = c.value("1");
        expect(result.value).equals(1);

        c = new SchemaDefinition({ schema : 0 });
        result = c.value("1asas");
        expect(result.value).equals("1asas");

        done();

    });

    it(".value() normalize booleans", function (done) {

        var c, result;

        c = new SchemaDefinition({ schema : true });

        result = c.value(undefined);
        expect(result.value).equals(null);

        result = c.value(null);
        expect(result.value).equals(null);

        result = c.value(true);
        expect(result.value).equals(true);

        result = c.value(false);
        expect(result.value).equals(false);

        result = c.value(1);
        expect(result.value).equals(true);

        result = c.value(0);
        expect(result.value).equals(false);

        result = c.value("0");
        expect(result.value).equals(false);

        result = c.value("1");
        expect(result.value).equals(true);

        done();

    });

    it(".object()", function (done) {

        var c = new SchemaDefinition({
            schema : { "t": 0 }
        });

        var result = c.object({ t: 1, t1: 1, t2: 2, t3: 3 });

        expect(result.value).equals({ t: 0 });
        expect(result.errors.length).equals(0);

        done();

    });

    it(".object({ regexp })", function (done) {

        var c = new SchemaDefinition({
            schema : {
                "/^a.*/": 0,
                "a1": ""
            }
        });

        var result = c.object({ a1: "1", a2: 2, b2: 2, c3: 3 });

        expect(result.value).equals({ a1: "", a2: 0 });
        expect(result.errors.length).equals(0);


        done();

    });

    it(".array()", function (done) {

        var c = new SchemaDefinition({
            schema : [ 1, 2 ]
        });

        var result = c.array([1]);

        expect(result.value).equals([1]);
        expect(result.errors.length).equals(1);

        /// test non repeatable
        c = new SchemaDefinition({
            schema : [ 1, 2 ]
        });

        result = c.array([1, 2]);

        expect(result.value).equals([1, 2]);
        expect(result.errors.length).equals(0);

        /// test repeatable with just one element
        c = new SchemaDefinition({
            schema : [ 1 ],
            repeatable: true
        });

        result = c.array([1, 2, 3, 4]);

        expect(result.value).equals([1, 1, 1, 1]);
        expect(result.errors.length).equals(0);

        /// test repeatable with two elements
        c = new SchemaDefinition({
            schema : [ 1, 2 ],
            repeatable: true
        });

        result = c.array([1, 2, 3, 4]);

        expect(result.value).equals([1, 2, 1, 2]);
        expect(result.errors.length).equals(0);

        /// test invalid repeatable
        c = new SchemaDefinition({
            schema : [ 1, 2 ],
            repeatable: true
        });

        result = c.array([1, 2, 3, 4, 5]);

        expect(result.value).equals([1, 2, 1, 2, 1]);
        expect(result.errors.length).equals(1);


        done();

    });


    it(".any().optional().value()", function (done) {

        var result = null;

        var c = new SchemaDefinition({ any: true, required: false });
        result = c.value({ a1: 1, a2: 2, b2: 2, c3: 3 });
        expect(result.value).equals({ a1: 1, a2: 2, b2: 2, c3: 3 });
        expect(result.errors.length).equals(0);


        c = new SchemaDefinition({ any: true, schema:"", required: false });
        result = c.value(null);
        expect(result.value).equals(null);
        expect(result.errors.length).equals(0);


        c = new SchemaDefinition({ any: true, schema:"", required: false });
        result = c.value(undefined);
        expect(result.value).equals(null);
        expect(result.errors.length).equals(0);


        done();

    });

    it(".any().required().value()", function (done) {

        var result = null;

        var c = new SchemaDefinition({ any: true, schema:"", required: true });
        result = c.value(null);
        expect(result.value).equals(null);
        expect(result.errors.length).equals(1);

        c = new SchemaDefinition({ any: true, schema:"", required: true });
        result = c.value(undefined);
        expect(result.value).equals(null);
        expect(result.errors.length).equals(1);

        done();

    });


    it(".any().required().default.value()", function (done) {

        var result = null;

        var c = new SchemaDefinition({ any: true, schema:"", required: true, default: "default" });
        result = c.value(undefined);
        expect(result.value).equals("default");
        expect(result.errors.length).equals(0);

        done();

    });


});

