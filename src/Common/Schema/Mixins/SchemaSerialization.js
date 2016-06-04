"use strict";

var _       = require("lodash"),
    Type    = require("../../Type"),
    Obj     = require("../../Obj"),
    Traverse    = require("../../Traverse");


/**
 * Convert the given value to a JSON compatible object, removing function names, ...
 *
 * @param  {Any} value
 * @return {Any}
 */
var convertToJSON = function Divhide_Schema_Mixins_SchemaSerialization_serializeToJSON(value){

    if(Type.isObject(value)){
        return _.assign({}, value);
    }

    return value;

};

/**
 *
 * Serialization methods for SchemaDefinition.
 *
 * @scope {SchemaDefinition}
 *
 * @type {Object}
 *
 */
var Serialization = function Divhide_Schema_Mixins_SchemaSerialization(){

    /**
     *
     * Serializes the schema definition.
     *
     * @return {Object}
     *
     */
    this.serialize = function Divhide_Schema_Mixins_SchemaSerialization_serialize(){

        return Traverse
            .each(convertToJSON)
            .transform(true)
            .traverse(this);

    };

    /**
     *
     * Deserializes the object into a SchemaDefinition
     *
     * @return {SchemaDefinition}
     *
     */
    this.deserialize = function Divhide_Schema_Mixins_SchemaSerialization_deserialize(value){
        return new this.constructor(value);
    };

};

module.exports = Serialization;