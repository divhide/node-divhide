'use strict';

var Type        = require("../Type"),
    Exception   = require("../Exception/Exception");

/**
 * @module Divhide/Assert/Required
 */

/**
 *
 * Assertion method that tests if the given value has a valid value.
 * An exception is thrown is the assertion fails!
 *
 * @function Required
 * @memberOf module:Divhide/Assert/Required
 *
 * @throws {Exception}
 *
 * @param {Any} val
 * @return {Any}
 *
 */
var Required = function Divhide_Assert_Required(val){

    var v = Type.isDefined(val);

    if(!v) {
        throw new Exception("VALIDATION_REQUIRED");
    }

    return val;

};

module.exports = Required;
