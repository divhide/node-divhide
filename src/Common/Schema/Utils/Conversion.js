"use strict";

var _                   = require("lodash"),
    Safe                = require("../../Safe"),
    Type                = require("../../Type"),
    SchemaDefinition    = require("../Entity/SchemaDefinition");

/**
 *
 * Default conversion between the value and a SchemaDefinition.
 * This converts a primitive value to a SchemaDefinition with defaults
 * value.
 *
 * @type {Object}
 *
 */
var Defaults = {

    array: function(value){

        if(!Type.isArray(value)){
            return;
        }

        // no default value and its required!
        value = new SchemaDefinition({
            schema: value,
            required: true
        });

        return value;

    },

    object: function(value){

        if(!Type.isObject(value)){
            return;
        }

        // no default value and its required!
        value = new SchemaDefinition({
            schema: value,
            required: true
        });

        return value;

    },

    string: function(value){

        if(!Type.isString(value)){
            return;
        }

        // no default value and its required!
        value = new SchemaDefinition({
            schema: "",
            required: true
        });

        return value;

    },

    number: function(value){

        if(!Type.isNumber(value)){
            return;
        }

        // no default value and its required!
        value = new SchemaDefinition({
            schema: 0,
            required: true
        });

        return value;

    },

    boolean: function(value){

        if(!Type.isBoolean(value)){
            return;
        }

        // no default value and its required!
        value = new SchemaDefinition({
            schema: Boolean(value),
            required: true
        });

        return value;

    },

    function: function(value){

        if(!Type.isFunction(value)){
            return;
        }

        // no default value and its required!
        value = new SchemaDefinition({
            schema: function(){},
            required: true
        });

        return value;

    },

};

/**
 *
 * Schema Conversion methods.
 *
 * @type {Object}
 *
 */
var Conversion = {

    /**
     *
     * Converts the given structure to a SchemaDefinition
     *
     * @param  {*} schema
     *
     * @return {SchemaDefinition}
     *
     */
    convert: function(schema){

        /// no need to convert if its already in SchemaDefinition form.
        if(schema instanceof SchemaDefinition){
            return schema;
        }

        var result = Defaults.object(schema) || Defaults.array(schema) ||
                     Defaults.string(schema) || Defaults.number(schema) ||
                     Defaults.boolean(schema) || Defaults.function(schema);

        if(!result){
            throw new Error("Schema conversion not supported.");
        }

        return result;

    }

};


module.exports = Conversion;

