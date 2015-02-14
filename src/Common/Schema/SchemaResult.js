"use strict";

var Safe                = require("../Safe"),
    Type                = require("../Type"),
    Assert              = require("../Assert"),
    ExceptionList       = require("../Exception/ExceptionList"),
    Types               = require("./Types"),
    SchemaResultNode    = require("./SchemaResultNode");

/**
 *
 * @class
 * Stores the result of a schema evaluation. It will keep reference to 
 * the global structure and the evaluation tree as well.
 *
 * @param {*} schema
 * @param {*} value
 *
 *
 */
var SchemaResult = function(schema, value){

    /// validate schema
    Assert.instanceOf(Types.SchemaDefinition)
        .assert(schema);
    
    value = Safe.value(value);

    /**
     *
     * Top-down global error tracking
     * 
     * @type {ExceptionList}
     * 
     */
    var errors = new ExceptionList();

    /**
     *
     * Hierarchical evaluation reference node
     * 
     * @type {SchemaResultNode}
     * 
     */
    var node = new SchemaResultNode(schema);
    
    /**
     *
     * SchemaResult API
     * 
     * @type {Object}
     * 
     */
    var self = {

        /// TODO
        schema: schema,
        value: value,
        errors: errors,

        /**
         *
         * Set the value of the given index.
         *
         * @param {Number|String} index
         * @param {*} value
         *
         */
        set: function(index, value) {

            /// just set the value if is an array or an object
            if(!(schema.isArray() || schema.isObject())){
                return;
            }

            /// if is an object and is null and its not required, ignore!
            /* jshint -W041 */
            if(schema.isObject() && value == null && !this.schema.required){
                return;
            }

            this.value[index] = value;

        }

    };

    /// expose module as 'Typed' SchemaResult instance
    return new Types.SchemaResult(self);

};

module.exports = SchemaResult;
