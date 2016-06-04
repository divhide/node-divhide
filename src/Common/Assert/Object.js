'use strict';

var Type        = require("../Type"),
    Exception   = require("../Exception/Exception");

/**
 * @module Divhide/Assert/Object
 */

/**
 *
 * Assertion method that tests if the given value is an object.
 * An exception is thrown is the assertion fails!
 *
 * @function Object
 * @memberOf module:Divhide/Assert/Object
 *
 * @throws {Exception}
 *
 * @param {Any} val
 * @return {Object}
 *
 */
var Obj = function Divhide_Assert_Object(val){

    var v = Type.isObject(val);

    if(!v){
        throw new Exception("VALIDATION_TYPE", { value: Type.of(val), expected: Type.of({}) });
    }

    return val;

};

module.exports = Obj;
