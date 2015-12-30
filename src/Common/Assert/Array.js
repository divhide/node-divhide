'use strict';

var Type        = require("../Type"),
    Exception   = require("../Exception/Exception");

/**
 * @module Divhide/Assert/Array
 */

/**
 *
 * Assertion method that tests if the given value in an Array.
 * An exception is thrown is the assertion fails!
 *
 * @function Array
 * @memberOf module:Divhide/Assert/Array
 *
 * @param {Any} val
 * @throws {Exception}
 *
 * @return {Array}
 *
 */
var Arr = function(val){

    var v = Type.isArray(val);

    if(!v){
        throw new Exception("VALIDATION_TYPE", { value: Type.of(val), expected: Type.of([]) });
    }

    return val;

};

module.exports = Arr;
