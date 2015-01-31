"use strict";

var Type                = require("../../Type"),
    SchemaDefinition    = require("../Entity/SchemaDefinition"),
    ExceptionList       = require("../../Exception/ExceptionList");

/**
 *
 * @class
 * The Result values entity of the applied schema.
 *
 * @param {*} schema
 * @param {*} value
 *
 */
var Result = function(schema, value){

    if(!(schema instanceof SchemaDefinition)){
        throw new Error("Expected schema of type 'SchemaDefinition'");
    }

    this.schema     = schema;
    this.value      = value;
    this.errors     = new ExceptionList();

    this.isArray    = Type.isArray(schema.schema);
    this.isObject   = Type.isObject(schema.schema);

};

/**
 *
 * Set the value of the given index.
 *
 * @param {Number|String} index
 * @param {*} value
 *
 */
Result.prototype.set = function(index, value) {

    /// just set the value if is an array or an object
    if(!(this.isArray || this.isObject)){
        return;
    }

    /// if is an object and is null and its not required, ignore!
    /* jshint -W041 */
    if(this.isObject && value == null && !this.schema.required){
        return;
    }

    this.value[index] = value;

};

module.exports = Result;
