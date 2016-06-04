"use strict";

var _ = require("lodash"),
    Type = require("../Type"),
    Coerce = require("../Coerce"),
    Traverse = require("../Traverse");

/**
 * @module Divhide/Obj/stringify
 */

/**
 *
 * Converts the given primitive value to its string
 * representation.
 *
 * @param  {*} value
 * @return {String}
 */
var convertLiteralToString = function Divhide_Obj_stringify_convertLiteralToString(value){
    // wrap the string with quotes if it's a string.
    if(Type.isString(value)){
        value = "\"" + value + "\"";
    }
    return String(value);
};

/**
 *
 * Get the annotation info from the annotate callback.
 * @ignore
 * @param  {Function} annotateCallback
 * @param  {Any} value
 * @param  {Object} info
 * @return {Comment}
 */
var getAnnotation = function Divhide_Obj_stringify_getAnnotation(annotateCallback, value, info){

    var annotation = {
        before: "",
        after: ""
    };

    if(!annotateCallback){
        return annotation;
    }

    var res = annotateCallback.apply({}, [ value, info ]);
    res = Coerce.object(res);

    annotation.before = Coerce.string(res.before);
    annotation.after = Coerce.string(res.after);

    return annotation;

};

/**
 *
 * Structure callback called before the structure is traversed ( top-down ).
 * This changes the traversal accumulator, returning it.
 *
 * @param {*}       value
 * @param {Object}  info
 * @param {String}  accumulator
 * @param {Object}  options
 *
 * @return {String}
 *
 */
var stringifyTopDownFn = function Divhide_Obj_stringify_stringifyTopDownFn(value, info, accumulator, options){

    var resultStr = "",
        isLiteral = !Type.isComplex(value);

    // get the annotation and save it for the stringifyBottomUpFn
    var annotation = getAnnotation(options.annotate, value, info);
    info.tmpData.annotation = annotation;

    // Initialization of identation and "key:"

    if(Type.isString(info.index)){
        resultStr = resultStr + (options.space ? _.repeat(options.space, info.level-1) : "");
        resultStr = resultStr + convertLiteralToString(info.index) + ":" + (options.space ? " " : "");
    }
    else if(Type.isNumber(info.index) && !isLiteral){
        resultStr = resultStr + (options.space ? _.repeat(options.space, info.level-1) : "");
    }

    // apply annotation before the structure
    resultStr = resultStr + (annotation.before ? annotation.before : "");

    // Print of the value for literal, Object and Array values

    if(isLiteral){
        // don't apply identation if value is child of an Object
        resultStr = resultStr + ((options.space && !Type.isString(info.index)) ? _.repeat(options.space, info.level-1) : "");
        resultStr = resultStr + convertLiteralToString(value);
    }
    else if(Type.isObject(value)){
        resultStr = resultStr + "{";
        resultStr = resultStr + (options.space && !Type.isEmpty(value) ? "\n" : "");
    }
    else if(Type.isArray(value)){
        resultStr = resultStr + "[";
        resultStr = resultStr + (options.space && !Type.isEmpty(value) ? "\n" : "");
    }

    // append the result to the accumulator
    return accumulator + resultStr;

};

/**
 *
 * Structure callback called after the structure is traversed ( bottom-up ).
 * This changes the traversal accumulator, returning it.
 *
 * @param {*}       value
 * @param {Object}  info
 * @param {String}  accumulator
 * @param {Object}  options
 *
 * @return {String}
 *
 */
var stringifyBottomUpFn = function Divhide_Obj_stringify_stringifyBottomUpFn(value, info, accumulator, options){

    var resultStr = "",
        isLiteral = !Type.isComplex(value),
        annotation = info.tmpData.annotation;

    if(Type.isObject(value)){
        resultStr = resultStr + (options.space && !Type.isEmpty(value) ? _.repeat(options.space, info.level-1) : "");
        resultStr = resultStr + "}";
    }
    else if(Type.isArray(value)){
        resultStr = resultStr + (options.space && !Type.isEmpty(value) ? _.repeat(options.space, info.level-1) : "");
        resultStr = resultStr + "]";
    }

    resultStr = resultStr + (info.isLast === false ? "," : "");

    // apply annotation after the structure
    resultStr = resultStr + (annotation.after ? annotation.after : "");

    resultStr = resultStr + (options.space && info.parent ? "\n" : "");

    // append the result to the accumulator
    return accumulator + resultStr;

};

/**
 *
 * Converts the given value to a friendly string.
 * This function represents an alternative to JSON.stringify adding more options.
 *
 * @alias module:Divhide/Obj/stringify
 * @type {Function}
 * @protected
 *
 * @param  {Any} value The value to stringify
 * @param  {Object} options
 * @param  {Number} options.space The identation level
 *
 * @return {String} The string representation of the value.
 *
 */
var stringify = function Divhide_Obj_stringify(value, options){

    options = _.extend({
        space: 4,
        annotate: null
    }, options);

    // convert the given identation number into a repeatable string
    var identationSpaces = _.repeat(" ", Coerce.number(options.space, 0));

    return Traverse
        .each(stringifyTopDownFn)
        .afterEach(stringifyBottomUpFn)
        .accumulator("")
        .options({
            space: identationSpaces,
            annotate: Coerce.function(options.annotate, null)
        })
        .traverse(value);
};

module.exports = stringify;
