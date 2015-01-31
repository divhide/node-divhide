"use strict";

var _                   = require("lodash"),
    Safe                = require("../../Safe"),
    SchemaDefinition    = require("../Entity/SchemaDefinition");

/**
 *
 * Serialization methods for SchemaDefinition.
 *
 * @type {Object}
 *
 */
var Serialization = {

    /**
     *
     * Serializes the schema definition.
     *
     * @return {Object}
     *
     */
    serialize: function(schema){

        return _.cloneDeep(schema);

    },

    /**
     *
     * Deserializes the object into a SchemaDefinition
     *
     * @return {SchemaDefinition}
     *
     */
    deserialize: function(value){

        value = Safe.object(value);
        return new SchemaDefinition(value);

    }

};

module.exports = Serialization;