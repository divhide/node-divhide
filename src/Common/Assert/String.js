'use strict';

var Type        = require("../Type"),
    Exception   = require("../Exception/Exception");

/**
 * @module Divhide/Assert/String
 */

/**
 *
 * Assertion method that tests if the given value is an instance of a String.
 * An exception is thrown is the assertion fails!
 *
 * @function String
 * @memberOf module:Divhide/Assert/String
 *
 * @throws {Exception}
 *
 * @param {Any} val
 * @return {String}
 *
 */
var Str = function Divhide_Assert_String(val){

    var v = Type.isString(val);

    if(!v){
        throw new Exception("VALIDATION_TYPE", { value: Type.of(val), expected: Type.of("") });
    }

    return val;

};

module.exports = Str;
