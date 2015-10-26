"use strict";

var _                           = require("lodash"),
    Safe                        = require("../../Safe"),
    Type                        = require("../../Type"),
    Assert                      = require("../../Assert"),
    Exception                   = require("../../Exception/Exception"),
    Types                       = require("../Types"),
    SchemaResult                = require("../SchemaResult"),
    SchemaException             = require("../SchemaException"),
    SchemaExecutionHelper       = require("./SchemaExecutionHelper");

/**
 *
 * Iterate over the complex value
 *
 * @param  {SchemaDefinition}   schema          The SchemaDefinition to evaluate
 * @param  {*}                  originalValue   The value to evaluate
 * @param  {Object}             validationFns   The custom validation functions
 *
 * @return {SchemaResult}
 *
 */
var execute = function(schema, originalValue, validationFns){

    var value = originalValue;

    /// get the value from the schema
    try {
        value = SchemaExecutionHelper.prepareValue(schema, value, validationFns);
    }
    catch(e){
        /* jshint -W064 */
        return SchemaResult(schema).set(e);
    }

    /// if value is null there's no need to iterate
    /* jshint -W041 */
    if(value == null){
        /* jshint -W064 */
        return SchemaResult(schema).set(value);
    }

    /// if is expecting any value return it straight away
    if(schema.any){
        /* jshint -W064 */
        return SchemaResult(schema).set(value);
    }

    /// if is not a complex value return the value
    if(!schema.isArray() && !schema.isObject()){
        /* jshint -W064 */
        return SchemaResult(schema).set(value);
    }

    /// prepare the schema for execution against the value. This will expand
    /// the schema to match the value
    try {
        schema = SchemaExecutionHelper.prepareSchema(schema, value, validationFns);
    }
    catch(e){
        return SchemaResult(schema).set(e);
    }

    /// after the preparation, reset the result value before iterating
    var result = SchemaResult(schema);

    /// recursion over the inner values of the schema
    _.each(schema.schema, function(innerSchema, key){

        /// recursive execute the schema
        var innerResult = innerSchema.execute(value[key], validationFns);

        /// merge the innerResult
        result.set(innerResult, key);

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
        if(!result.isValid()){

            /// try to fallback to the default value if it can
            /* jshint -W041 */
            if(this.default != null){

                var dresult = execute(this, this.default, validationFns);

                /// if default value is valid use it, otherwise use the given
                /// value
                if(dresult.isValid()){
                    result = dresult;
                }

            }

        }

        return result;

    };

};

module.exports = Execution;

