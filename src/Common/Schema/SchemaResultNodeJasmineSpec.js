'use strict';

/* jshint -W041 */

describe("SubModules.Schema.SchemaResultNode", function () {

    var SchemaDefinition        = Divhide.SubModules.Schema.SchemaDefinition,
        SchemaResultNode    = Divhide.SubModules.Schema.SchemaResultNode,
        Schema                  = Divhide.Schema;

    beforeEach(function () {

        jasmine.addMatchers({
            equals: function(expected) {

                return {
                    compare: function(actual, expected) {
                        return { pass: _.isEqual(actual, expected) };
                    }
                };

            }
        });

    });

    it(".ctor()", function () {

        /// expected instanceof Schema
        expect(function(){
            new SchemaResultNode();
        }).toThrowError("Expected instance of 'SchemaDefinition'.");

    });

    it(".setValue() - primitive value", function () {

        var result = SchemaResultNode(
            new SchemaDefinition({
                schema: "",
                required: true
            }));

        expect(result.setValue("str"))
            .toBe("str");

        expect(function(){
            result.setValue("str", 1);
        }).toThrowError("Invalid operation!");

    });

    it(".setValue() - object", function () {

        var result = SchemaResultNode(
            new SchemaDefinition({
                schema: {},
                required: true
            }));

        /// missing index
        expect(function(){
            result.setValue("str");
        }).toThrowError("Invalid operation!");

        /// value must be a SchemaResultNode
        expect(function(){
            result.setValue("str", "key");
        }).toThrowError("Invalid operation!");

        /// add a SchemaResultNode
        result.setValue(
            SchemaResultNode(new SchemaDefinition({ schema: "" })),
            "str");

        var value = result.getValue();
        expect(value.str != null)
            .toBe(true);

    });

    it(".setValue() - array", function () {

        var result = SchemaResultNode(
            new SchemaDefinition({
                schema: [],
                required: true
            }));

        /// missing index
        expect(function(){
            result.setValue("str");
        }).toThrowError("Invalid operation!");

        /// value must be a SchemaResultNode
        expect(function(){
            result.setValue("str", "key");
        }).toThrowError("Invalid operation!");

        /// value must be a SchemaResultNode
        expect(function(){
            result.setValue(
                SchemaResultNode(new SchemaDefinition({ schema: "" })),
                "str");
        }).toThrowError("Invalid operation!");

        /// add a SchemaResultNode
        result.setValue(
            SchemaResultNode(new SchemaDefinition({ schema: "" })));

        var value = result.getValue();
        expect(value.length)
            .toBe(1);

    });

});
