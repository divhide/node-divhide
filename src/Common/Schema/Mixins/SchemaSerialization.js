"use strict";

var _       = require("lodash"),
    Type    = require("../../Type"),
    Safe    = require("../../Safe"),
    Obj     = require("../../Obj");


/**
 * Convert the given value to a JSON compatible object, removing function names, ...
 * @param  {Any} value
 * @return {Any}
 */
var serializeToJSON = function schemaserialization_serializeToJSON(value){

    if(Type.isObject(value)){
        return _.assign({}, value);
    }

    return value;

};


var recursiveMap = function(value, callback){

    var result = callback(value);

    if(!Type.isObject()){
        return result;
    }

    _.forEach(value, function(val, index){
        result[index] = recursiveMap(val);
    });

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
var Serialization = function(){

    /**
     *
     * Serializes the schema definition.
     *
     * @return {Object}
     *
     */
    this.serialize = function(){
        return recursiveMap(this, serializeToJSON);
    };

    /**
     *
     * Deserializes the object into a SchemaDefinition
     *
     * @return {SchemaDefinition}
     *
     */
    this.deserialize = function(value){
        return new this.constructor(value);
    };

};

module.exports = Serialization;