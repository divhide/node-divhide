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

    /// initialize result value
    var value = null;
    if(schema.isObject()){
        value = {};
    } else if(schema.isArray()){
        value = [];
    }

    /**
     *
     * Flat list of all the errors found. Please note the this will contain all the
     * errors that were found so far.
     *
     * @type {ExceptionList}
     *
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
         * Set the the value and errors associated to a schema evaluation.
         *
         * @param {*} value
         * @param {Object} options
         *
         */
        set: function(val, options) {

            /// normalize val
            val = Safe.value(val);

            /// normalize options
            options = Safe.object(options);
            options.index   = Safe.value(options.index, null);
            options.errors  = Safe.value(options.errors, null);

            /// set the value or the index value if given
            if(options.index !== null){
                value[options.index] = val;
            }
            else {
                value = val;
            }

            /// set the given errors
            if(errors){
                errors.push(options.errors);
            }

        }

    };

    /// expose module as 'Typed' SchemaResult instance
    return new Types.SchemaResult(self);

};

module.exports = SchemaResult;
