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
         * @param {*|Error} val  The value
         * @param {String} index The index on which to set the value
         *
         */
        set: function(val, index) {

            // arguments normalization
            val = Safe.value(val);
            index = Safe.coerce(index, "");

            // check if the value is an Error
            var isError = Type.instanceOf(val, Error);

            // lazy load the debugValue ExceptionList
            if(isError && !index && !Type.instanceOf(debugValue, ExceptionList)){
                debugValue = new ExceptionList();
            }
            else if(isError && index && !Type.instanceOf(debugValue[index], ExceptionList)){
                debugValue[index] = new ExceptionList();
            }

            // always save the error on the error flat list
            if(isError){
                errors.push(val);
            }

            // set non-error and simple structures
            if(!isError && !index){
                debugValue = value = val;
            }
            // set non-error and complex structures
            else if(!isError && index){
                debugValue[index] = value[index] = val;
            }
            // set error and simple structures
            else if(isError && !index){
                debugValue = val;
            }
            // set error and complex structures
            else if(isError && index){
                debugValue[index] = val;
            }

        }

    };

    /// expose module as 'Typed' SchemaResult instance
    return new Types.SchemaResult(self);

};

module.exports = SchemaResult;
