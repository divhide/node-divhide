'use strict';

var _           = require("lodash"),
    Type        = require("../Type"),
    Coerce      = require("../Coerce"),
    Exception   = require("../Exception/Exception");

/**
 * @module Divhide/Assert/Regex
 */

/**
 *
 * Assertion method that tests if the given value matches the regular expression.
 * An exception is thrown is the assertion fails!
 *
 * @function Regex
 * @memberOf module:Divhide/Assert/Regex
 *
 * @ignore
 *
 * @throws {Exception}
 *
 * @param {Any} val
 * @param {String|Regex} regex The Regex object or a string thar contains a regular expression pattern.
 * @return {Any}
 *
 */
var Regex = function Divhide_Assert_Regex(val, regex){

    regex = Coerce.regexp(regex);

    var isValid = !!regex.exec(val);

    if(!isValid){
        throw new Exception("REGEXP", { value: val });
    }

    return val;

};

module.exports = Regex;