"use strict";

var _                   = require("lodash"),
    Coerce              = require("../Coerce"),
    Type                = require("../Type"),
    Assert              = require("../Assert"),
    Types               = require("./Types"),
    SchemaResult        = require("./SchemaResult"),
    ExceptionList       = require("../Exception/ExceptionList");

/**
 *
 * SchemaResult is entity representation of an evaluated structure node, containing the
 * values and errors for the given value.
 *
 * Errors can be accessed by a flat structure, returning all the errors for the complex
 * structure; or by the value itself. All Errors are instances of SchemaException.
 *
 * @protected
 *
 * @param {*} schema The Schema object
 *
 */
var SchemaResult = function Divhide_Schema_SchemaResult(schema){

    /// validate schema
    Assert.instanceOf(Types.SchemaDefinition)
        .assert(schema);

    /**
     * Contains the debug information (errors and values) about the Schema evaluation.
     * Every exception will be represented by an ExceptionList instance.
     * @type {Any}
     */
    var value = schema.getEmptyValue();

    /**
     * Is value a complex object flag.
     * @type {Boolean}
     */
    var isComplex = Type.isArray(value) || Type.isObject(value);

    /**
     * A flat list containing all the errors
     * @type {ExceptionList}
     */
    var errors = new ExceptionList();

    /**
     * Set an Error object as a value.
     *
     * @param {Error}   error The schema evaluation error
     * @param {String}  index The index of the value, if complex structure
     *
     */
    var setErrorValue = function Divhide_Schema_SchemaResult_setErrorValue(error, index){

        // always save the error at the structure level
        errors.push(error);

        // in the case of an index is provided save the error
        // at the index level
        if(index){

            // lazy initialization of the exception list
            if(!Type.instanceOf(value[index], ExceptionList)){
                value[index] = new ExceptionList();
            }

            value[index].push(error);

        }
        else {

            // lazy initialization of the exception list
            if(!Type.instanceOf(value, ExceptionList)){
                value = new ExceptionList();
            }

            value.push(error);

        }

    };

    /**
     * Set a SchemaResult object as a value. The given inner SchemaResult
     * is merged with the current result.
     *
     * @param {SchemaResult}    schemaResult
     * @param {String}          index
     */
    var setInnerSchemaResultValue = function Divhide_Schema_SchemaResult_setInnerSchemaResultValue(schemaResult, index){

        if(!index){
            throw new Error("index must be defined");
        }

        // set inner value if schemaResult is valid
        if(schemaResult.isValid()){

            // set the given value if is valid
            var innerValue = schemaResult.getValue(),
                innerSchema = schemaResult.getSchema(),
                isOptional = schema.isObject() && !innerSchema.required;

            // skip is the value is optional and is not defined
            /* jshint -W041 */
            if(isOptional && innerValue == null){
                return;
            }

        }
        // set errors if schemaResult is not valid
        else {
            // propagate the inner errors
            errors.push(schemaResult.getErrors());
        }

        // set the debug value to the given one. This can be a value or an
        // ExceptionList in the case of an exception.
        value[index] = schemaResult.getValue();

    };

    /**
     * Set a Value object as a value.
     *
     * @param {SchemaResult}    val
     * @param {String}          index
     */
    var setValue = function Divhide_Schema_SchemaResult_setValue(val, index){

        // set non-error and simple structures
        if(!index){
            value = val;
        }
        // set non-error and complex structures
        else {
            value[index] = val;
        }

    };

    /**
     *
     * SchemaResult API
     *
     * @type {Object}
     *
     */
    var self = {

        /**
         *
         * Get the schema that is being used.
         *
         * @return {SchemaDefinition}
         *
         */
        getSchema: function Divhide_Schema_SchemaResult_getSchema(){
            return schema;
        },

        /**
         *
         * Get the evaluated value. This object contain values and errors
         * all together.
         *
         * The value contains every inner values and inner exceptions. Whenever an error
         * is found the error is represented by an ExceptionList of SchemaException.
         *
         *
         * @return {Any|ExceptionList}
         *
         */
        getValue: function Divhide_Schema_SchemaResult_getValue(){
            return value;
        },

        /**
         *
         * Get the errors associated to with given schema.
         *
         * @return {ExceptionList}
         *
         */
        getErrors: function Divhide_Schema_SchemaResult_getErrors(){
            return errors;
        },

        /**
         *
         * Returns true if the schema is valid; false otherwise.
         *
         * @return {Boolean}
         *
         */
        isValid: function Divhide_Schema_SchemaResult_isValid(){
            return errors.length === 0;
        },

        /**
         *
         * Saves the value of a Schema evaluation. Values can be objects, Erros, ...
         *
         * @param {*|SchemaResult|Error} val  The value
         * @param {String} index The index on which to set the value
         *
         * @return {SchemaResult} The current SchemaResult instance
         *
         */
        set: function Divhide_Schema_SchemaResult_set(val, index) {

            // arguments normalization
            val = Coerce.value(val);
            index = Coerce.coerce(index, "");

            // set SchemaResult object
            if(Type.instanceOf(val, Types.SchemaResult)){
                setInnerSchemaResultValue(val, index);
            }
            // set Error object
            else if(Type.instanceOf(val, Error)){
                setErrorValue(val, index);
            }
            // set Value object
            else {
                setValue(val, index);
            }

            return new Types.SchemaResult(self);

        }

    };

    /// expose module as 'Typed' SchemaResult instance
    return new Types.SchemaResult(self);

};

module.exports = SchemaResult;
