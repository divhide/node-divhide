'use strict';

describe("SubModules.Schema.Mixins.SchemaExecutionHelper", function() {

    var SchemaDefinition = Divhide.SubModules.Schema.SchemaDefinition,
        Helper           = Divhide.SubModules.Schema.Mixins.SchemaExecutionHelper;


    beforeEach(function() {

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


    ///
    /// .prepareValue() tests
    ///
    
    describe(".prepareValue()", function(){

        it("should return the value", function() {

            var c = new SchemaDefinition({
                schema : 2
            });

            var result = Helper.prepareValue(c, 1);
            expect(result).equals(1);

        });

        it(".object() should return the value", function() {

            var c = new SchemaDefinition({
                schema : { one: 1 }
            });

            var result = Helper.prepareValue(c, { one: "2" });
            expect(result).equals({ one: "2" });

        });

        it(".array() should return the value", function() {

            var c = new SchemaDefinition({
                schema : [ 1, 2 ]
            });

            var result = Helper.prepareValue(c, [ 0, 0 ]);
            expect(result).equals([ 0, 0 ]);

        });

        it(".required(false) null value should return null", function() {

            var c = new SchemaDefinition({
                schema : 2,
                required: false
            });

            var result = Helper.prepareValue(c, null);
            expect(result).equals(null);

            result = Helper.prepareValue(c, undefined);
            expect(result).equals(null);

        });

        it(".strict(false) literal values should be coerced", function() {

            var c = new SchemaDefinition({
                schema : 2
            });

            var result = Helper.prepareValue(c, 1);
            expect(result).equals(1);

            result = Helper.prepareValue(c, "1");
            expect(result).equals(1);

            ///
            c = new SchemaDefinition({
                schema : ""
            });

            result = Helper.prepareValue(c, 1);
            expect(result).equals("1");

            result = Helper.prepareValue(c, "1");
            expect(result).equals("1");

            ///
            c = new SchemaDefinition({
                schema : true
            });

            result = Helper.prepareValue(c, 1);
            expect(result).equals(true);

            result = Helper.prepareValue(c, "1");
            expect(result).equals(true);

            result = Helper.prepareValue(c, true);
            expect(result).equals(true);

        });

        it(".strict(true) literal values shouldn't be coerced", function() {

            var c = new SchemaDefinition({
                schema : 2,
                strict: true
            });

            expect(function(){
                Helper.prepareValue(c, "1");
            }).toThrowError("'number' was expected but found 'string' instead.");

        });

        it(".require(true) null value should throw error", function() {

            var c = new SchemaDefinition({
                schema : 2
            });

            expect(function(){
                Helper.prepareValue(c, null);
            }).toThrowError("Value is required.");

        });

        it("wrong types should throw errors", function() {

            var c = new SchemaDefinition({
                schema : 2
            });

            expect(function(){
                Helper.prepareValue(c, { one: 1 });
            }).toThrowError("'number' was expected but found 'object' instead.");

            expect(function(){
                Helper.prepareValue(c, []);
            }).toThrowError("'number' was expected but found 'array' instead.");

        });

        it("validations function should be executed", function() {

            var c = new SchemaDefinition({
                schema : ""
            });

            c.validations.push({ name: "validation1" });
            c.validations.push({ name: "validation2" });

            var errors = null;
            try {
                errors = Helper.prepareValue(c, "valerror", {
                    validation1: function(val){ throw new Error(val); },
                    validation2: function(val){ throw new Error("VALIDATION_REQUIRED"); },
                });
            } catch(e){
                errors = e;
            }

            expect(errors.length).equals(2);
            expect(errors.items[0].message).equals("valerror");
            expect(errors.items[1].message).equals("Value is required.");

        });

    });

    ///
    /// prepareSchema()
    ///
    
    describe(".prepareSchema()", function(){

        it("primitive should return the schema", function() {

            var c = new SchemaDefinition({
                schema : 2
            });

            var expected = new SchemaDefinition({
                schema : 0
            });

            var result = Helper.prepareSchema(c, 1);
            expect(result).equals(expected);

        });

        it(".object() should return the schema", function() {

            var c = new SchemaDefinition({
                schema : { "t": 0 }
            });

            var expected = new SchemaDefinition({
                schema : { "t": 0 },
                require: true
            });

            var result = Helper.prepareSchema(c, { t: 1, t1: 1, t2: 2, t3: 3 });
            expect(result).equals(expected);

        });

        it("incompatible types should throw", function() {

            var c = new SchemaDefinition({
                schema : { one: 0 },
                strict: true
            });

            var errors = null;
            try {
                Helper.prepareSchema(c, 1);
            } catch(e){
                errors = e;
            }
            
            expect(errors.length)
                .equals(1);

        });

        it(".any() should accept any value", function() {

            var c = new SchemaDefinition({ 
                any: true, 
                required: false 
            });

            var expected = new SchemaDefinition({ 
                schema: null,
                any: true, 
                required: false 
            });

            var result = Helper.prepareSchema(c, { a1: 1, a2: 2, b2: 2, c3: 3 });  
            expect(result).equals(expected);
            
            ///
            c = new SchemaDefinition(c, { 
                any: true, 
                schema:"", 
                required: false 
            });

            expected = new SchemaDefinition({ 
                schema: null,
                any: true, 
                required: false 
            });

            result = Helper.prepareSchema(c, null);
            expect(result).equals(expected);

            ///
            c = new SchemaDefinition({ 
                any: true, 
                schema: null, 
                required: false 
            });

            expected = new SchemaDefinition({ 
                any: true, 
                schema: null, 
                required: false 
            });

            result = Helper.prepareSchema(c, "val");
            expect(result).equals(expected);

        });

        it(".any() and .required() with null should throw error", function() {

            var c = new SchemaDefinition({ 
                any: true, 
                schema:"", 
                required: true 
            });

            var errors = null;
            try {
                Helper.prepareSchema(c, null);
            } catch(e){
                errors = e;
            }
            
            expect(errors.length).equals(1);

        });

        it(".object() should return all keys that match the regex for the value", function() {

            var c = new SchemaDefinition({
                schema : {
                    "/^a.*/": 0,
                    "a1": ""
                }
            });

            var expected = new SchemaDefinition({
                schema : { "a1": "", "a2": 0, },
                require: true
            });

            var result = Helper.prepareSchema(c, { a1: "1", a2: 2, b2: 2, c3: 3 });
            expect(result).equals(expected);

        });
        
        it(".array() .repeatable(true) should return the value's schema", function() {

            /// test non repeatable
            var c = new SchemaDefinition({
                schema : [ 1 ],
                repeatable: true
            });

            var expected = new SchemaDefinition({
                schema : [ 0, 0, 0, 0 ],
                repeatable: true
            });

            var result = Helper.prepareSchema(c, [1, 2, 3, 4]);
            expect(result).equals(expected);
           
            /// test repeatable with two elements
            c = new SchemaDefinition({
                schema : [ 1, 2 ],
                repeatable: true
            });

            expected = new SchemaDefinition({
                schema : [ 0, 0, 0, 0 ],
                repeatable: true
            });

            result = Helper.prepareSchema(c, [1, 2, 3, 4]);
            expect(result).equals(expected);

        });

        it(".array() .repeatable(true) should throw error", function() {

            var c = new SchemaDefinition({
                schema : [ 1, 2 ],
                repeatable: true
            });

            var errors = null;
            try {
                Helper.prepareSchema(c, [1]);
            } catch(e){
                errors = e;
            }
            
            expect(errors.length).equals(1);

            /// 
            
            c = new SchemaDefinition({
                schema : [ 1, 2 ],
                repeatable: true
            });

            errors = null;
            try{
                Helper.prepareSchema(c, [1, 2, 3, 4, 5]);
            } 
            catch(e){
                errors = e;
            }
            
            expect(errors.length).equals(1);

            ///
            
            c = new SchemaDefinition({
                schema : [ 1, 2 ],
                repeatable: true
            });

            errors = null;
            try{
                Helper.prepareSchema(c, []);
            } 
            catch(e){
                errors = e;
            }
            
            expect(errors.length).equals(1);
            

        });

        it(".array() .repeatable(false) should return the schema", function() {

            /// test non repeatable
            var c = new SchemaDefinition({
                schema : [ 1, 2 ],
                repeatable: false
            });

            var expected = new SchemaDefinition({
                schema : [ 0, 0 ],
                repeatable: false
            });

            var result = Helper.prepareSchema(c, [1, 2]);
            expect(result).equals(expected);
           
        });

        it(".array() .repeatable(false) should throw error", function() {

            var c = new SchemaDefinition({
                schema : [ 1, 2 ],
                repeatable: false
            });

            var errors = null;
            try {
                Helper.prepareSchema(c, [1, 2, 3]);
            } catch(e){
                errors = e;
            }
            
            expect(errors.length).equals(1);
           
        });

    });

});

