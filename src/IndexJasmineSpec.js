"use strict";

///
/// Jasmine test setup
///

/// expose window._
/* jshint -W079 */
window._ = require("lodash");

/// Define global matchers
window.JasmineCustomMatchers = {
    
    /**
     *
     * Compare the given objects using _.isEqual
     * 
     * @param  {*}  expected
     * @return {Boolean}
     * 
     */
    equals: function(expected) {

        return {
            compare: function(actual, expected) {
                return { pass: _.isEqual(actual, expected) };
            }
        };

    }

};
