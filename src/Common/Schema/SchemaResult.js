"use strict";

var _                   = require("lodash"),
    Safe                = require("../Safe"),
    Type                = require("../Type"),
    Assert              = require("../Assert"),
    Types               = require("./Types"),
    SchemaResult        = require("./SchemaResult"),
    ExceptionList       = require("../Exception/ExceptionList");

/**
 *
 * Stores the result of a schema evaluation. It will keep reference to
 * the global structure and the evaluation tree as well.
 *
 * @protected
 *
 * @param {*} schema    The Schema object
 *
 *
 */
var SchemaResult = function(schema){

    /// validate schema
    Assert.instanceOf(Types.SchemaDefinition)
        .assert(schema);

    /**
     * The value object
     * @type {*}
     */
    var value = schema.getEmptyValue();

    /**
     * Contains the debug information (errors and values) about the Schema processing.
     * Every exception will be represented by an ExceptionList instance.
     * @type {*}
     */
    var debugValue = schema.getEmptyValue();

    /**
     * Is value a complex object flag.
     * @type {Boolean}
     */
    var isComplex = Type.isArray(value) || Type.isObject(value);

    /**
     * A flat list containing all the errors
     * @type {ExceptionList}
     */
    var errors = new ExceptionList();

    /**
     * Set an Error object as a value.
     *
     * @param {Error}   error The schema evaluation error
     * @param {String}  index The index of the value, if complex structure
     *
     */
    var setErrorValue = function(error, index){

        // always save the error at the structure level
        errors.push(error);

        // in the case of an index is provided save the error
        // at the index level
        if(index){

            // lazy initialization of the exception list
            if(!Type.instanceOf(debugValue[index], ExceptionList)){
                debugValue[index] = new ExceptionList();
            }

            debugValue[index].push(error);

        }
        else {

            // lazy initialization of the exception list
            if(!Type.instanceOf(debugValue, ExceptionList)){
                debugValue = new ExceptionList();
            }

            debugValue.push(error);

        }

    };

    /**
     * Set a SchemaResult object as a value. The given inner SchemaResult
     * is merged with the current result.
     *
     * @param {SchemaResult}    schemaResult
     * @param {String}          index
     */
    var setInnerSchemaResultValue = function(schemaResult, index){

        if(!index){
            throw new Error("index must be defined");
        }

        // set inner value if schemaResult is valid
        if(schemaResult.isValid()){

            // set the given value if is valid
            var innerValue = schemaResult.getValue(),
                innerSchema = schemaResult.getSchema(),
                isOptional = schema.isObject() && !innerSchema.required;

            // skip is the value is optional and is not defined
            /* jshint -W041 */
            if(isOptional && innerValue == null){
                return;
            }

            // if there are no previous errors set the value
            if(value != null){
                value[index] = innerValue;
            }

        }
        // set errors if schemaResult is not valid
        else {
            // set the value to null if an inner error happened
            value = null;
            // propagate the inner errors
            errors.push(schemaResult.getErrors());
        }

        // set the debug value to the given one. This can be a value or an
        // ExceptionList in the case of an exception.
        debugValue[index] = schemaResult.getDebugValue();

    };

    /**
     * Set a Value object as a value.
     *
     * @param {SchemaResult}    val
     * @param {String}          index
     */
    var setValue = function(val, index){

        // set non-error and simple structures
        if(!index){
            debugValue = value = val;
        }
        // set non-error and complex structures
        else {
            debugValue[index] = value[index] = val;
        }

    };

    /**
     *
     * SchemaResult API
     *
     * @type {Object}
     *
     */
    var self = {

        /**
         *
         * Get the schema that is being used.
         *
         * @return {*}
         *
         */
        getSchema: function(){
            return schema;
        },

        /**
         *
         * Get the value object of all valid values, or null if the validation failed.
         *
         * @return {*}
         *
         */
        getValue: function(){
            return value;
        },

        /**
         *
         * Get the debug value. This object contain values and errors
         * all together.
         *
         * In the case of an exception this will be an ExceptionList
         * instance.
         *
         * @return {*|ExceptionList}
         *
         */
        getDebugValue: function(){
            return debugValue;
        },

        /**
         *
         * Get the errors associated to with given schema.
         *
         * @return {ExceptionList}
         *
         */
        getErrors: function(){
            return errors;
        },

        /**
         *
         * Returns true if the schema is valid; false otherwise.
         *
         * @return {Boolean}
         *
         */
        isValid: function(){
            return errors.length === 0;
        },

        /**
         *
         * Saves the value of a Schema evaluation. Values can be objects, Erros, ...
         *
         * @param {*|SchemaResult|Error} val  The value
         * @param {String} index The index on which to set the value
         *
         * @return {SchemaResult} The current SchemaResult instance
         *
         */
        set: function(val, index) {

            // arguments normalization
            val = Safe.value(val);
            index = Safe.coerce(index, "");

            // set SchemaResult object
            if(Type.instanceOf(val, Types.SchemaResult)){
                setInnerSchemaResultValue(val, index);
            }
            // set Error object
            else if(Type.instanceOf(val, Error)){
                setErrorValue(val, index);
            }
            // set Value object
            else {
                setValue(val, index);
            }

            return new Types.SchemaResult(self);

        }

    };

    /// expose module as 'Typed' SchemaResult instance
    return new Types.SchemaResult(self);

};

module.exports = SchemaResult;
