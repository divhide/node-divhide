"use strict";

/** @module Divhide/Obj/TraverseStack */

var _ = require("lodash"),
    Safe = require("../Safe"),
    Type = require("../Type");

/**
 *
 * Tracks the traversal stack structure by saving the index and
 * structure path.
 *
 * This performs checkings for circular dependencies on the stack by
 * indexing the value and it's structure index/key to minimize lookup time.
 *
 * @class
 * @alias module:Divhide/Obj/TraverseStack
 * @protected
 *
 * @param {Array|null} stack The current stack array
 * @param {Object|null} indexLookup The index lookup object of the stack array
 *
 */
var TraverseStack = function(stack, indexLookup){

    /**
     * Saves all the structure path
     * @type {Array}
     * @private
     * @ignore
     */
    stack = Safe.array(stack, []);

    /**
     * Index lookup of structures.
     * @type {Object}
     * @private
     * @ignore
     */
    indexLookup = Safe.object(indexLookup, {});

    /**
     *
     * Create the stack record information for the current stack.
     *
     * @type {Function}
     * @private
     * @ignore
     *
     * @param {Any} value
     * @param {String|Number} index
     * @param {Object} index
     *
     * @return {Object}
     *
     */
    var createStackRecord = function divhide_obj_traversestack_createstackrecord(value, index, options){

        options = Safe.object(options);

        /* jshint -W041 */
        var parentRecord = _.last(stack),
            parent = (parentRecord != null ? parentRecord.value : null),
            level = (stack.length + 1),
            isFirst = (parentRecord != null) ? !!options.isFirst : true,
            isLast = (parentRecord != null) ? !!options.isLast : true;

        return {
            value: value,
            info: {
                parent: parent,
                index: Safe.value(index),
                level: level,
                isFirst: isFirst,
                isLast: isLast,
                isCircularReference: !!options.isCircularReference
            }
        };

    };

    /**
     * module exposure
     * @ignore
     */
    var self = {

        /**
         *
         * Push a value and index to the traversal stack. Also, this validates the stack for circular references,
         * avoiding 'Maximum call stack size exceeded' errors.
         *
         * @memberOf module:Divhide/Obj~TraverseStack#
         * @method push
         *
         * @param {Any} value The value
         * @param {Number|String|null} index Optional. The index of the given value.
         * @param {Object} options Extra information about value to push.
         *
         * @return {Boolean} False if a circular reference is detected; True otherwise.
         *
         */
        push: function divhide_obj_traversestack_push(value, index, options){

            var isComplex = Type.isComplex(value),
            isCircularReference = false;

            // if value is complex and there's a saved index only then
            // search if the value exists
            /* jshint -W041 */
            if(isComplex || index != null || indexLookup[index] != null){
                isCircularReference = _.includes(indexLookup[index], value);
            }

            // mark the value as circular reference
            if(isCircularReference){
                options = _.extend({}, options, { isCircularReference: true });
            }

            // only save values on the lookup table when index exists
            // and the value is complex
            if(index != null && !isCircularReference && isComplex){
                if(indexLookup[index] == null){
                    indexLookup[index] = [];
                }
                indexLookup[index].push(value);
            }

            // save the value information to the stack
            var stackRecord = createStackRecord(value, index, options);
            stack.push(stackRecord);

            return isCircularReference;

        },

        /**
         *
         * Gets the information about the current stack information ( last element information ).
         *
         * @memberOf module:Divhide/Obj~TraverseStack#
         * @method currentInfo
         *
         * @return {Object} info
         *
         */
        currentInfo: function divhide_obj_traversestack_currentinfo(){
            var last = _.last(stack);
            return last ? _.clone(last.info) : null;
        },

        /**
         *
         * Clone the instance of the traversal stack.
         *
         * @memberOf module:Divhide/Obj~TraverseStack#
         * @method clone
         *
         * @return {TraverseStack}
         *
         */
        clone: function divhide_obj_traversestack_clone(){
            return new TraverseStack(
                _.clone(stack),
                _.clone(indexLookup));
        }

    };

    return self;

};

module.exports = TraverseStack;
