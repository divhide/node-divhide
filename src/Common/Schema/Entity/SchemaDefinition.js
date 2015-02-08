"use strict";


var _               = require("lodash"),
    Type            = require("../../Type"),
    Safe            = require("../../Safe"),
    Exception       = require("../../Exception/Exception"),
    ExceptionList   = require("../../Exception/ExceptionList");

/**
 *
 * A SchemaDefinition class. Contains all the rules that should be applied when
 * evaluating it against a value.
 *
 * @param {Object} options
 *
 */
var SchemaDefinition = function(options){

    options = Safe.object(options);

    /**
     *
     * The type of schema
     *
     * @type {*} SchemaDefinition|[SchemaDefinition]|{ "": SchemaDefinition }
     *
     */
    this.schema = options.schema;

    /**
     *
     * Flag that enables strict convertion.
     *
     * @type {Boolean}
     *
     */
    this.strict = Safe.boolean(options.strict, false);

    /**
     *
     * Any flag. This means that any value is accepted.
     *
     * @type {Boolean}
     *
     */
    this.any = Safe.boolean(options.any, false);

    /**
     *
     * The default value of the schema
     *
     * @type {*}
     */
    this.default = options.default;

    /**
     *
     * IsRequired flag
     *
     * @type {Boolean}
     *
     */
    this.required = Safe.boolean(options.required, true);

    /**
     *
     * Repeatable flag. This means, e.g. if the schema is an array the inner schema can
     * be repeatable by elements.
     *
     * @type {Boolean}
     */
    this.repeatable = Safe.boolean(options.repeatable);

    /**
     *
     * The validation functions to apply to this Schema node. Each validation function is
     * represented by: { name: 'fn', args: '' }
     *
     * @type {Array}
     *
     */
    this.validations = Safe.array(options.validations);

};

/**
 *
 * Gets the schema value by applying non iterative rules.
 * The errors are appended to the given error reference.
 *
 * @throw ExceptionList
 *
 * @param  {*}      value
 * @param  {Object} validationFns
 *
 * @return {SchemaResult}
 *
 */
SchemaDefinition.prototype.value = function(value, validationFns){

    value           = Safe.value(value);
    validationFns   = Safe.object(validationFns);

    var Result  = require("./SchemaResult"),
        result  = new Result(this, value),
        schema  = this.schema;

    /// If not defined set default
    /* jshint -W041 */
    if(this.default != null && value == null){
        value = this.default;
    }

    /// if any then the schema obj is set to the value
    if(this.any){
        schema = value;
    }

    /// if not strict tries to normalize
    /// the value (e.g. a number can be on string representation )
    if(!this.strict){
        value = Safe.coerce(value, schema);
    }

    /// If not defined and its required throw
    /* jshint -W041 */
    if(this.required && value == null)
    {
        result.errors.push(
            new Exception("VALIDATION_REQUIRED")
        );
    }

    /* jshint -W041 */
    else if(!this.required && value == null){
        /// continue (optional parameter)
    }

    /// check for compatibility of types
    else if( Type.of(schema) !== Type.of(value) )
    {
        result.errors.push(
            new Exception("VALIDATION_TYPE", { expected: Type.of(schema), value: Type.of(value) })
        );
    }

    /// if there's no errors so far and value is required or has a value then
    /// run the validations.
    /* jshint -W041 */
    if( !result.errors.length && (this.required || value != null) ){

        _.each(
            this.validations,
            function(v){

                v = Safe.object(v);

                var fn      = Safe.function(validationFns[v.name]),
                    args    = Safe.array(v.args);

                try{
                    fn.apply({}, [value].concat(args));
                }catch(e){
                    var error = new Exception(e.message);
                    result.errors.push(error);
                }

        });

    }

    /// set the result value
    result.value = value;

    return result;

};

/**
 *
 * Get the schema to be applied on the value when it is an object.
 * The errors are appended to the given error reference.
 *
 * @param  {Object} value
 *
 * @return {SchemaResult}
 *
 */
SchemaDefinition.prototype.object = function(value){

    value = Safe.object(value);

    var scope       = this,
        Result      = require("./SchemaResult"),
        result      = new Result(this, {}),
        valueKeys   = _.keys(value);

    _.each(
        this.schema,
        function(schema, key){

            var isRegExp = Type.isRegExpStr(key),
                keys     = [];

            /// key is not a regexp string
            if(!isRegExp){
                keys = [ key ];
            }
            else {
                /// key is a regexp string
                var regexp  = Safe.regexp(key);
                keys = _.filter(
                    valueKeys,
                    function(key){

                        /// if there's a definition of the schema don't include it
                        if(scope.schema[key] !== undefined){
                            return false;
                        }

                        /// test if the regex match
                        return !!regexp.exec(key);

                    });
            }

            _.each(keys, function(val) {
                result.set(val, schema);
            });

        });

    return result;

};

/**
 *
 * Get the schema to be applied on the value when it is an array.
 * The errors are appended to the given error reference.
 *
 * @param  {Array} value
 *
 * @return {SchemaResult}
 *
 */
SchemaDefinition.prototype.array = function(value){

    value   = Safe.array(value);

    var Result  = require("./SchemaResult"),
        result  = new Result(this, []),
        index   = 0;

    if( !this.repeatable && this.schema.length != value.length ){
        result.errors.push(
            new Exception("VALIDATION_INVALID_LIST_LENGTH", { value: value.length, expected: this.schema.length })
        );
    }

    if( this.repeatable && value.length % this.schema.length !== 0 ){
        result.errors.push(
            new Exception("VALIDATION_INVALID_LIST_LENGTH_MULTIPLE_OF", { value: value.length, expected: this.schema.length })
        );
    }

    for(var i=0; i<value.length; i++){

        if(this.repeatable && index >= this.schema.length){
            index = 0;
        }

        result.value.push(this.schema[index++]);

    }

    return result;

};



module.exports = SchemaDefinition;

