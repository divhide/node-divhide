"use strict";

var _ = require("lodash"),
    Type = require("../Type"),
    Safe = require("../Safe"),
    traverse = require("./traverse");

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
var convertLiteralToString = function(value){

    // wrap the string with quotes if it's a string.
    if(Type.isString(value)){
        value = "\"" + value + "\"";
    }

    return String(value);

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
var stringifyCallback = function(value, info, accumulator, options){

    var resultStr = "",
        isLiteral = !Type.isComplex(value);

    // Initialization of identation and "key:"

    if(Type.isString(info.index)){
        resultStr = resultStr + (options.space ? _.repeat(options.space, info.level-1) : "");
        resultStr = resultStr + convertLiteralToString(info.index) + ":" + (options.space ? " " : "");
    }
    else if(Type.isNumber(info.index) && !isLiteral){
        resultStr = resultStr + (options.space ? _.repeat(options.space, info.level-1) : "");
    }

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
var stringifyCallbackAfter = function(value, info, accumulator, options){

    var resultStr = "",
        isLiteral = !Type.isComplex(value);

    if(Type.isObject(value)){
        resultStr = resultStr + (options.space && !Type.isEmpty(value) ? _.repeat(options.space, info.level-1) : "");
        resultStr = resultStr + "}";
    }
    else if(Type.isArray(value)){
        resultStr = resultStr + (options.space && !Type.isEmpty(value) ? _.repeat(options.space, info.level-1) : "");
        resultStr = resultStr + "]";
    }

    resultStr = resultStr + (info.isLast === false ? "," : "");
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
var stringify = function(value, options){

    options = _.extend({
        space: 4
    }, options);

    // convert the given identation number into a repeatable string
    var identationSpaces = _.repeat(" ", Safe.number(options.space, 0));

    return traverse(
        value,
        // traverse options
        {
            callback: stringifyCallback,
            callbackAfter: stringifyCallbackAfter
        },
        "",
        // callback options
        { space: identationSpaces });
};

module.exports = stringify;
