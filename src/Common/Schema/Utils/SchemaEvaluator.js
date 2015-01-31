"use strict";


var _                   = require("lodash"),
    Type                = require("../../Type"),
    Safe                = require("../../Safe"),
    ExceptionList       = require("../../Exception/ExceptionList"),
    Types               = require("../Types"),
    SchemaDefinition    = require("../Entity/SchemaDefinition"),
    Compilation         = require("./Compilation"),
    Execution           = require("./Execution"),
    Serialization       = require("./Serialization");



/**
 *
 * Pre-compilation converter. At this stage the given schema can be:
 *
 * - a primitive value (object, array, string, ...)
 * - a 'Schema' instance
 * - a 'SchemaEvaluator instance'
 *
 * @param  {*} schema
 * @return {*}
 *
 */
var preCompilationFunction = function(schema){

    var schemaEvaluator = null;

    /// try to see if we have an instance of SchemaEvaluator.
    if(schema instanceof Types.SchemaEvaluator){
        schemaEvaluator = schema;
    }
    /// try to see if we have an instance of Schema.
    else if(schema instanceof Types.Schema){
        var schemaEval = schema.compile();
        if(schemaEval instanceof Types.SchemaEvaluator){
            schemaEvaluator = schemaEval;
        }
    }

    /// if is a SchemaEvaluator instance then the
    /// schema is already compiled!
    if(schemaEvaluator){
        return schemaEvaluator.compiledSchema();
    }
    else {
        return schema;
    }

};

/**
 *
 * @class
 * The schema evaluator facade. This will serve as interface to the Schema
 * execution.
 *
 * @param {SchemaDefinition|Object|...}    schema
 * @param {Object}    validationFns
 *
 */
var SchemaEvaluator = function(schema, validationFns){

    /**
     *
     * The compiled schema
     *
     * @type {}
     *
     */
    schema = Compilation.compile(schema, preCompilationFunction);

    /**
     *
     * The custom validation functions
     *
     * @type {Object}
     *
     */
    validationFns = Safe.object(validationFns);

    /**
     *
     * SchemaEvaluator external API
     *
     * @type {Object}
     *
     */
    var self = {

        /**
         *
         * Gets the compiled schema.
         *
         * @return {SchemaDefinition}
         *
         */
        compiledSchema: function(){
            return schema;
        },

        /**
         *
         * Evaluate and get the errors
         *
         * @param  {*}      value
         * @param  {Object} validationFns
         *
         * @return {[Error]}
         *
         */
        errors: function(value){

            var result = Execution.execute(schema, value, validationFns);
            return result.errors;

        },

        /**
         *
         * Tests if the schema is valid against the given value.
         *
         * @param  {*}  value
         *
         * @return {Boolean}
         *
         */
        isValid: function(value){

            var result = Execution.execute(schema, value, validationFns);
            return result.errors.length === 0;

        },

        /**
         *
         * Gets the value after applying the schema.
         *
         * @throws {ExceptionList}
         *
         * @param  {*} value
         *
         * @return {*}
         *
         */
        value: function(value){

            var result = Execution.execute(schema, value, validationFns);

            if(result.errors.length){
                throw result.errors;
            }

            return result.value;

        },

        /**
         *
         * Serialize the current Schema
         *
         * @return {Object}
         *
         */
        serialize: function(){

            return Serialization.serialize(schema);

        },

        /**
         *
         * Deserialize the value. Returns a new instance of SchemaEvaluator.
         *
         * @return {SchemaEvaluator}
         *
         */
        deserialize: function(value){

            var schema = Compilation.compile(value, function(value){
                return new SchemaDefinition(value);
            });

            return new SchemaEvaluator(schema, validationFns);

        }

    };

    return new Types.SchemaEvaluator(self);

};


module.exports = SchemaEvaluator;
