'use strict';

var _           = require("lodash"),
    Type        = require("../Type"),
    Safe        = require("../Safe"),
    Exception   = require("../Exception/Exception");

/**
 * @module Divhide/Assert/Max
 */

/**
 *
 * Assertion method that tests if the given value is higher than the given maximum.
 * An exception is thrown is the assertion fails!
 *
 * @function Max
 * @memberOf module:Divhide/Assert/Max
 *
 * @throws {Exception}
 *
 * @param {Any} val
 * @return {Any}
 *
 */
var Max = function(val, max){

    max = Safe.number(max);
    var length = Safe.length(val);

    if(length > max){
        throw new Exception("VALIDATION_MAX", { value: max });
    }

    return val;

};

module.exports = Max;
