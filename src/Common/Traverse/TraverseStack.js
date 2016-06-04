"use strict";

/** @module Divhide/Obj/TraverseStack */

var _ = require("lodash"),
    Coerce = require("../Coerce"),
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
 * @protected
 *
 * @param {Array|null} stack The current stack array
 * @param {Object|null} indexLookup The index lookup object of the stack array
 *
 */
var TraverseStack = function Divhide_Obj_Traversal_TraverseStack(stack, indexLookup){

    /**
     * Saves all the structure path
     * @type {Array}
     * @private
     * @ignore
     */
    stack = Coerce.array(stack, []);

    /**
     * Index lookup of structures.
     * @type {Object}
     * @private
     * @ignore
     */
    indexLookup = Coerce.object(indexLookup, {});

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
    var createStackRecord = function Divhide_Obj_Traversal_TraverseStack_createstackrecord(value, index, options){

        options = Coerce.object(options);

        /* jshint -W041 */
        var parentRecord = _.last(stack),
            parent = (parentRecord != null ? parentRecord.value : null),
            level = (stack.length + 1),
            isFirst = (parentRecord != null) ? !!options.isFirst : true,
            isLast = (parentRecord != null) ? !!options.isLast : true,
            data = (parentRecord != null ? parentRecord.info.data : {});

        return {
            value: value,
            info: {
                parent: parent,
                index: Coerce.value(index),
                level: level,
                isFirst: isFirst,
                isLast: isLast,
                isCircularReference: !!options.isCircularReference,
                data: data, // shared data structure
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
        push: function Divhide_Obj_Traversal_TraverseStack_push(value, index, options){

            var isComplex = Type.isComplex(value),
            isCircularReference = false;

            // if value is complex check if the value exists on the index lookup
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
        currentInfo: function Divhide_Obj_Traversal_TraverseStack_currentinfo(){

            var last = _.last(stack);
            if(!last){
                return null;
            }

            var info = _.clone(last.info);
            info.tmpData = {}; // initialize tmpData to store temporary data (iteration data)
            return info;

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
        clone: function Divhide_Obj_Traversal_TraverseStack_clone(){
            return new TraverseStack(
                _.clone(stack),
                _.clone(indexLookup));
        }

    };

    return self;

};

module.exports = TraverseStack;
