"use strict";

var _                   = require("lodash"),
    Safe                = require("../../Safe"),
    Type                = require("../../Type"),
    Conversion          = require("./Conversion"),
    SchemaDefinition    = require("../Entity/SchemaDefinition");


var Compilation = {

    /**
     *
     * Compile the current schema to a SchemaDefinition. This will compile a JSON value
     * into a SchemaDefinition object.
     *
     * The preCompileConverterFn function is used to change the object before it is compile.
     * It may be useful to convert different types of object to a compatible compilation object.
     *
     *
     * @param {*}           schema
     * @param {Function}    preCompileConverterFn
     *
     * @return {SchemaDefinition}
     *
     */
    compile: function(schema, preCompileConverterFn){

        /// the custom value converter
        preCompileConverterFn = Safe.function(preCompileConverterFn, function(val){ return val; });
        schema = preCompileConverterFn(schema) || schema;

        /// convert the schema
        var compiled = Conversion.convert(schema),
            isArray  = Type.isArray(compiled.schema),
            isObject = Type.isObject(compiled.schema);

        /// recursive traverse
        if(isArray || isObject){

            compiled.schema = _.clone(compiled.schema);

            _.each(compiled.schema, function(val, index){
                var innerSchema = Compilation.compile(val, preCompileConverterFn);
                compiled.schema[index] = innerSchema;
            });

        }

        return compiled;

    }

};

module.exports = Compilation;

