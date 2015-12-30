'use strict';

var _     = require("lodash"),
    Safe  = require("./Safe");

/**
 *
 * Provides a set of utilities to use with Object type instances.
 *
 * @static
 * @type Object
 * @namespace Divhide/Obj
 * @borrows module:Divhide/Obj/traverse as traverse
 *
 */
var Obj = {

    /**
     *
     * Get the object keys. If a filter is specified it returns the keys
     * that match the filter regular expression.
     *
     * @memberOf Divhide/Obj
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
     *
     * @memberOf Divhide/Obj
     * @method stringify
     *
     * @param {Any} value
     *
     */
    stringify: require("./Obj/stringify")

};

module.exports = Obj;
