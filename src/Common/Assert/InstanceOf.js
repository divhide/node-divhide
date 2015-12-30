'use strict';

var _           = require("lodash"),
    Type        = require("../Type"),
    Exception   = require("../Exception/Exception");

/**
 * @module Divhide/Assert/InstanceOf
 */

/**
 *
 * Get function name
 *
 * @ignore
 *
 * @param  {Function} fn
 * @return {String}
 *
 */
var getFnName = function(fun) {

	var ret = fun.toString();
	ret = ret.substr('function '.length);
	ret = ret.substr(0, ret.indexOf('('));
	return ret;

};


/**
 *
 * Assertion method that tests if the given value in an instance of the given type.
 * An exception is thrown is the assertion fails!
 *
 * @function InstanceOf
 * @memberOf module:Divhide/Assert/InstanceOf
 *
 * @throws {Exception}
 *
 * @param {Any} val
 * @param {Function} expectedFn
 *
 * @return {Any}
 *
 */
var InstanceOf = function(val, expectedFn){

	/// test with instanceof
	if(!Type.instanceOf(val, expectedFn)){
		throw new Exception("VALIDATION_INSTANCEOF", { value: getFnName(expectedFn) });
	}

    return val;

};

module.exports = InstanceOf;
