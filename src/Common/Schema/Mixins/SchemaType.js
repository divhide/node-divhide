"use strict";

var Type = require("../../Type");

/**
 *
 * Schema type methods
 *
 * @scope {SchemaDefinition}
 *
 * @type {Object}
 *
 */
var SchemaType = function(){

    /**
     *
     * Checks if the schema is an array
     *
     * @return {Boolean}
     *
     */
    this.isArray = function(){
        return Type.isArray(this.schema);
    };

    /**
     *
     * Checks if the schema is an object
     *
     * @return {Boolean}
     *
     */
    this.isObject = function(){
        return Type.isObject(this.schema);
    };

    /**
     *
     * Get's an empty value that was derived from
     * the schema type.
     *
     * @return {Array|Object|null} The empty value
     *
     */
    this.getEmptyValue = function(){

        /// initialize result value
        var value = null;
        if(this.isObject()){
            value = {};
        }
        else if(this.isArray()){
            value = [];
        }

        return value;

    };

};

module.exports = SchemaType;
