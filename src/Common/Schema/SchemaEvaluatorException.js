"use strict";

var Obj = require("../Obj");

/**
 *
 * Error object that is used to encapsulate a Schema evaluation error.
 * This provide utility methods to handle errors.
 *
 * @param {SchemaResult} schemaResult
 *
 */
var SchemaEvaluatorException = function Divhide_Schema_SchemaEvaluatorException(schemaResult){

    /**
     * Gets the string representation of a SchemaResult instance.
     *
     * @param {Object} options
     * @param {Object} translations
     *
     * @return {String}
     *
     */
    this.toString = function Divhide_Schema_SchemaEvaluatorException_toString(options, translations){
        return Obj.stringify(
            schemaResult.getValue());
    };

};

SchemaEvaluatorException.prototype = new Error();
SchemaEvaluatorException.prototype.constructor = SchemaEvaluatorException;

module.exports = SchemaEvaluatorException;
