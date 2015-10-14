"use strict";

var Safe                = require("../Safe"),
    Type                = require("../Type"),
    Assert              = require("../Assert"),
    ExceptionList       = require("../Exception/ExceptionList"),
    Types               = require("./Types");

/**
 *
 * @class
 * Stores the result of a schema evaluation. It will keep reference to
 * the global structure and the evaluation tree as well.
 *
 * @param {*} schema
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
     * @param {Error}   val
     * @param {String}  index
     */
    var setErrorValue = function(val, index){

        // lazy load the debugValue ExceptionList
        if(!index && !Type.instanceOf(debugValue, ExceptionList)){
            debugValue = new ExceptionList();
        }
        else if(index && !Type.instanceOf(debugValue[index], ExceptionList)){
            debugValue[index] = new ExceptionList();
        }

        // set error and simple structures
        if(index){
            debugValue = val;
        }
        // set error and complex structures
        else {
            debugValue[index] = val;
        }

        // always save the error on the error flat list
        errors.push(val);

    };

    /**
     * Set a SchemaResult object as a value.
     *
     * @param {SchemaResult}    val
     * @param {String}          index
     */
    var setSchemaResultValue = function(val, index){
        throw new Error("Not implemented exception");
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
         * Get the value result.
         *
         * @return {*}
         *
         */
        getValue: function(){
            return value;
        },

        /**
         *
         * Saves the value of a Schema evaluation. Values can be objects, Erros, ...
         *
         * @param {*|SchemaResult|Error} val  The value
         * @param {String} index The index on which to set the value
         *
         */
        set: function(val, index) {

            // arguments normalization
            val = Safe.value(val);
            index = Safe.coerce(index, "");

            // set SchemaResult object
            if(Type.instanceOf(val, Types.SchemaResult)){
                setSchemaResultValue(val, index);
            }
            // set Error object
            else if(Type.instanceOf(val, Error)){
                setErrorValue(val, index);
            }
            // set Value object
            else {
                setValue(val, index);
            }

        }

    };

    /// expose module as 'Typed' SchemaResult instance
    return new Types.SchemaResult(self);

};

module.exports = SchemaResult;
