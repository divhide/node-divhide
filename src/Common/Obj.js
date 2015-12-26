'use strict';

/**
 * @module Divhide/Obj
 */

var _     = require("lodash"),
    Safe  = require("./Safe");

/**
 *
 * Provides a set of utilities to use with Object type instances.
 *
 * @static
 * @type Object
 * @alias module:Divhide/Obj
 * @borrows module:Divhide/Obj/traverse as traverse
 *
 */
var Obj = {

    /**
     *
     * Get the object keys. If a filter is specified it returns the keys
     * that match the filter regular expression.
     *
     * @method filter
     *
     * @param {Object}          obj
     * @param {String|RegExp}   filter
     *
     * @return {Array}
     *
     */
    filter: function(obj, filter){

        obj         = Safe.object(obj);
        filter      = Safe.regexp(filter, "/.*/");

        return _.transform(
            obj,
            function(result, val, key){

                if(filter.exec(key)){
                    result.push(key);
                }

                return result;

            },
            []);

    },

    /**
     * Traversal algorithm.
     * @ignore
     */
    traverse: require("./Obj/traverse"),

    /**
     * Converts any object to it's string representation.
     * See Obj/stringify.
     * @method stringify
     */
    stringify: require("./Obj/stringify")

};

module.exports = Obj;
