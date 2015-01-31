"use strict";


var _               = require("lodash"),
    Safe            = require("../../Safe"),
    Type            = require("../../Type"),
    SchemaResult    = require("../Entity/SchemaResult");


var Internal = {};

/**
 *
 * Iterate over the complex value
 *
 * @param  {SchemaDefinition} schema
 * @param  {*} value
 * @return {SchemaResult}
 *
 */
Internal.iterate = function(schema, value, validationFns){

    var result = new SchemaResult(schema, value);

    /// if value is null there's no need to iterate
    /* jshint -W041 */
    if(value == null){
        return result;
    }

    /// if is not a complex value return the value
    if(!result.isArray && !result.isObject){
        return result;
    }

    /// convert the schema depending on the object
    var getSchema = result.isObject ? schema.object : schema.array;

    /// reset result
    result = new SchemaResult(schema, result.isObject ? {} : []);

    /// get the schema to apply
    schema = getSchema.call(schema, value);

    /// merge the error while getting the schema and the result
    result.errors.push(schema.errors);

    /// only iterate over the schema if not errors were found!
    if(!result.errors.length){

        _.each(schema.value, function(schema, key){

            /// recursive execute the schema
            var _result = Execution.execute(schema, value[key], validationFns);

            /// add result to errors
            if(_result.errors.length)
            {
                result.errors.push(_result.errors);
                return;
            }

            /// if is an object and value is not required ignore!
            if( result.isObject && _result.value == null && !schema.required )
            {
                return;
            }

            /// set the value
            result.set(key, _result.value);

        });

    }

    return result;

};

/**
 *
 * Schema execution methods.
 *
 * @type {Object}
 *
 */
var Execution = {

    /**
     *
     * Execute Schema against the value.
     *
     * @param {SchemaDefinition} schema
     * @param {*} value
     * @param {Object} options
     *
     * @return {SchemaResult}
     *
     * @example
     *
     * execute(?,?, ?)
     *
     */
    execute: function(schema, value, validationFns){

        /// test if the value is correct
        var result = schema.value(value, validationFns);

        /// if value is not valid, return
        if(!result.errors.length){
            /// iterarte over complex structures and apply the rules
            result = Internal.iterate(schema, result.value, validationFns);
        }

        /// in case of errors try to recover
        if(result.errors.length){

            /// set the default value, no matter what it is!
            /* jshint -W041 */
            if(schema.default != null){
                result.value = schema.default;
                result.errors.clear();
            }

        }

        return result;

    }


};

module.exports = Execution;

