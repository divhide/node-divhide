'use strict';

var Type        = require("../Type"),
    Exception   = require("../Exception/Exception");

/**
 *
 * Test if value is an array
 *
 * @throws {Exception}
 *
 * @param {*} val
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
