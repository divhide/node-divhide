"use strict";

var _                       = require("lodash"),
    Safe                    = require("../../Safe"),
    Type                    = require("../../Type"),
    Assert                  = require("../../Assert"),
    Exception               = require("../../Exception/Exception"),
    Types                   = require("../Types"),
    SchemaResult            = require("../SchemaResult"),
    SchemaExecutionHelper   = require("./SchemaExecutionHelper");

/**
 *
 * Iterate over the complex value
 *
 * @param  {SchemaDefinition} schema
 * @param  {*} value
 * 
 * @return {SchemaResult}
 *
 */
var execute = function(schema, value, validationFns){

    /* jshint -W064 */
    var result = SchemaResult(schema, value);

    /// get the value from the schema
    try {
        value = result.value = SchemaExecutionHelper.prepareValue(schema, value, validationFns);
    }
    catch(e){
        result.errors.push(e);    
        return result;
    }

    /// if value is null there's no need to iterate
    /* jshint -W041 */
    if(value == null){
        return result;
    }

    /// if is not a complex value return the value
    if(!schema.isArray() && !schema.isObject()){
        return result;
    }

    /// prepare the schema for execution against the value. This will expand 
    /// the schema to match the value
    try {
        schema = SchemaExecutionHelper.prepareSchema(schema, value, validationFns);
    }
    catch(e){
        result.errors.push(e);    
        return result;
    }

    /// reset the result value before iterating
    result = SchemaResult(schema, schema.isObject() ? {} : []);
    
    /// recursion over the inner values of the schema
    _.each(schema.schema, function(schema, key){

        /// recursive execute the schema
        var innerResult = schema.execute(value[key], validationFns);

        /// add result to errors
        if(innerResult.errors.length){
            result.errors.push(innerResult.errors);
            return;
        }

        /// if is an object and value is not required ignore!
        if(result.schema.isObject() && innerResult.value == null && !schema.required){
            return;
        }

        /// set the value
        result.set(key, innerResult.value);

    });

    return result;

};

/**
 *
 * Schema execution methods.
 *
 * @type {Object}
 *
 */
var Execution = function(){

    /**
     *
     * Execute Schema against the value. This will perform a top-down recursion on
     * the given structure.
     *
     * @param {SchemaDefinition} schema
     * @param {*} value
     * @param {Object} options
     *
     * @return {SchemaResult}
     *
     */
    this.execute = function(value, validationFns){

        /// validate and normalize arguments
        Assert.instanceOf(Types.SchemaDefinition)
            .assert(this);

        /// if it has no errors iterate over the object
        var result = execute(this, value, validationFns);
        
        /// if there's error try to recover by applying the default value
        if(result.errors.length){

            /// try to fallback to the default value if it can
            /* jshint -W041 */
            if(this.default != null){
                
                var dresult = execute(this, this.default, validationFns);
                
                /// if default value is valid use it, otherwise use the given 
                /// value
                if(!dresult.errors.length){
                    result = dresult;
                }

            }

        }

        return result;

    };

};

module.exports = Execution;

