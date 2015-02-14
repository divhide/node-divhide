"use strict";

var _                   = require("lodash"),
    Type                = require("../Type"),
    Safe                = require("../Safe"),
    Assert              = require("../Assert"),
    ExceptionList       = require("../Exception/ExceptionList"),
    Types               = require("./Types");

/**
 *
 * SchemaResultNode stores a Schema evaluation result of a given hierarchical item.
 *
 * - Each inner value of a complex object must be an instance of SchemaResultNode.
 * - Each error of a SchemaResultNode is associated with the value itself and not
 * his inner values.
 *
 *
 * @class
 *
 * @param {SchemaDefinition} schema
 *
 */
var SchemaResultNode = function(schema) {

    Assert.instanceOf(Types.SchemaDefinition)
        .assert(schema);

    /**
     *
     * Is the value an array flag
     *
     * @type {Boolean}
     *
     */
    var isArray = Type.isArray(schema.schema);

    /**
     *
     * Is the value an array flag
     *
     * @type {Boolean}
     *
     */
    var isObject = Type.isObject(schema.schema);

    /**
     *
     * The schema associated value. This value will hold a
     * SchemaResultNode.
     *
     * @type {*}
     *
     */
    var value = null;

    /// initialize the value with the expected type
    if(isArray){
        value = [];
    }
    else if(isObject){
        value = {};
    }

    /**
     *
     * The list of errors associated with the Schema
     * conversion.
     *
     * @type {ExceptionList}
     *
     */
    var errors = new ExceptionList();

    /**
     *
     * Module API
     *
     * @type {Object}
     *
     */
    var self = {

        /**
         *
         * The schema value being evaluated.
         * Returns a cloned copy of the value is returned.
         *
         * @return {*}
         *
         */
        getValue: function(){
            return _.clone(value);
        },

        /**
         *
         * Set the SchemaResultNode for the given value.
         *
         * @throws {Error} If val is not an instance of SchemaResultNode
         * 
         * @param {SchemaResultNode} val
         * @param {*} index
         *
         * @return {*} The added SchemaResultNode
         *
         */
        setValue: function(val, index){

            /// validate setValue arguments
            var isIndexValid     = Type.isNumber(index) || Type.isString(index),
                isSchemaResultNode = val instanceof Types.SchemaResultNode;

            /// if current schema is expecting an index and the given index is not valid or
            /// not a SchemaResultNode, throw Error
            if(isObject && (!isIndexValid || !isSchemaResultNode)){
                throw new Error("Invalid operation!");
            }

            /// if the value is an array the value should be SchemaResultNode and
            /// no index should be specified
            if(isArray && (!isSchemaResultNode || isIndexValid)){
                throw new Error("Invalid operation!");
            }

            /// if the value is a primitive value the value shouldn't be
            /// a SchemaResultNode and no index should be specified
            if(!isObject && !isArray && (isSchemaResultNode || isIndexValid)){
                throw new Error("Invalid operation!");
            }

            /// set the index
            if(isObject){
                value[index] = val;
            }
            else if(isArray){
                value.push(val);
            }
            else {
                value = val;
            }

            return val;
        },

        /**
         *
         * Get the error list
         *
         * @return {ExceptionList}
         *
         */
        getErrors: function(){
            return errors;
        },

        /**
         *
         * Add errors to the
         *
         * @param {Error} error
         *
         */
        addErrors: function(error){
            errors.push(error);
        },

        /**
         *
         * Pretty print the current schema value and its errors
         *
         * @return {String}
         *
         */
        toString: function(){

        }

    };

    return new Types.SchemaResultNode(self);

};

module.exports = SchemaResultNode;
