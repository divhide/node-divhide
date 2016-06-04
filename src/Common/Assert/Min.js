'use strict';

var _           = require("lodash"),
    Type        = require("../Type"),
    Coerce      = require("../Coerce"),
    Exception   = require("../Exception/Exception");

/**
 * @module Divhide/Assert/Min
 */

/**
 *
 * Assertion method that tests if the given value is lower than the given minimum.
 * An exception is thrown is the assertion fails!
 *
 * @function Min
 * @memberOf module:Divhide/Assert/Min
 *
 * @throws {Exception}
 *
 * @param {Any} val
 * @return {Any}
 *
 */
var Min = function Divhide_Assert_Min(val, min){

    min = Coerce.number(min);
    var length = Coerce.length(val);

    if(length < min){
        throw new Exception("VALIDATION_MIN", { value: min });
    }

    return val;

};

module.exports = Min;
