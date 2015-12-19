"use strict";

var _ = require("lodash"),
    Type = require("../Type"),
    traverse = require("./traverse");

/**
 *
 * Convert the SchemaResult to a string.
 *
 * @param {*}       value
 * @param {Object}  info
 * @param {String}  accumulator
 * @param {Object}  options
 *
 * @return {String}
 *
 */
var convertValueToStringCallback = function(value, info, accumulator, options){

    options = _.extend({
        lineBreak: "\n",
        space: " "
    }, options);

    var resultStr = "",
        isLiteral = !Type.isComplex(value);

    // callback is being run before the inner structure recursion
    if(info.isBefore){

        if(Type.isString(info.index)){

            resultStr = info.index + ": ";

            if(info.isFirst === true){
                resultStr = "{" + resultStr;
            }

            if(isLiteral){
                resultStr = resultStr + value;
            }

        }
        else if(Type.isNumber(info.index)){

            if(info.isFirst === true){
                resultStr = "[" + resultStr;
            }

            if(isLiteral){
                resultStr = resultStr + value;
            }

        }
        else if(!Type.isComplex(value)){
            resultStr = resultStr + value;
        }

    }
    // callback is being run after the inner structure recursion
    else if(info.isAfter){

        if(Type.isString(info.index)){

            if(info.isLast === false){
                resultStr = resultStr + ", ";
            }
            else {
                resultStr = resultStr + "}";
            }

        }
        else if(Type.isNumber(info.index)){

            if(info.isLast === false){
                resultStr = resultStr + ", ";
            }
            else {
                resultStr = resultStr + "]";
            }

        }

    }

    // append the result to the accumulator
    return accumulator + resultStr;

};

/**
 *
 * Converts the given value to a friendly string.
 *
 * @param  {*} value
 * @param  {Object} options
 *
 * @return {String}
 *
 */
var stringify = function(value, options){
    return traverse(
        value,
        convertValueToStringCallback,
        "",
        { runBefore: true, runAfter: true },
        options);
};

module.exports = stringify;
