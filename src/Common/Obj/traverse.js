"use strict";

var _ = require("lodash"),
    Type = require("../Type"),
    Safe = require("../Safe"),
    TraverseStack = require("./TraverseStack");

/**
 * @module Divhide/Obj/traverse
 */

/**
 *
 * Traverse the structure using a top-down strategy.
 * @ignore
 *
 * @param  {*} value
 * @param  {Object} options
 * @param  {Object} accumulator
 * @param  {Object} info
 * @param  {TraverseStack} stack
 *
 * @return {*} The accumulator
 *
 */
var recursiveTraversal = function divhide_obj_traverse_recursiveTraversal(value, options, accumulator, stack){

    var extraArgs = arguments.length > 4 ?
        _.slice(arguments, 4) : [];

    accumulator = Safe.value(accumulator);

    // initialize stack if it's empty, otherwise the inner loop will set it
    /* jshint -W041 */
    if(stack == null){
        stack = new TraverseStack();
        stack.push(value);
    }

    // get the current stack info
    var stackInfo = stack.currentInfo();

    // call callback before iteration
    if(options.callback){
        accumulator = options.callback.apply(
            {}, [ value, _.clone(stackInfo), accumulator ].concat(extraArgs) );
    }

    // iterate over the inner elements of complex structures
    if(!stackInfo.isCircularReference && Type.isComplex(value)){

        var loopSize = _.size(value),
            loopIndex = 0;

        _.forEach(value, function(val, index){

            var stackInfo = {
                isLast: loopIndex === (loopSize - 1),
                isFirst: loopIndex === 0
            };

            var innerStack = stack.clone();
            var isCircularReference = innerStack.push(val, index, stackInfo);

            accumulator = accumulator = recursiveTraversal.apply(
                {}, [ val, options, accumulator, innerStack ].concat(extraArgs) );

            loopIndex++;

        });

    }

    // call callback after iteration
    if(options.callbackAfter){
        accumulator = options.callbackAfter.apply(
            {}, [ value, _.clone(stackInfo), accumulator ].concat(extraArgs) );
    }

    return accumulator;

};

/**
 * Traverse function callback. This function is called for every structure
 * value.
 *
 * @callback module:Divhide/Obj/traverse~callback
 * @param {Any} value
 * @param {Object} info Traversal information
 * @param {Any} info.parent The parent object of the value
 * @param {String|Number} info.index The index of the value (in relation to the parent)
 * @param {Number} info.level The traversal level ( >= 1 )
 * @param {Boolean} info.isFirst True if value is the parent's first child
 * @param {Boolean} info.isLast True if value is the parent's last child
 * @param {Boolean} info.isCircularReference True if value is a circular reference.
 * @param {Any} accumulator The traversal accumulator.
 */

/**
 *
 * Perform a traversal of the given structure calling the given callback
 * before (top-down) and/or after (bottom-up).
 *
 * <p>If a circular reference is found the iteration will not skip the structure
 * and continue.</p>
 *
 * @example
 *
 * // perform a top-down traversal of the structure
 * traverse({
 *     value: 1
 * }, {
 *     callback: function(value, info, accumulator){
 *     }
 * });
 *
 * // perform a bottom-up traversal of the structure
 * traverse({
 *     value: 1
 * }, {
 *     callbackAfter: function(value, info, accumulator){
 *     }
 * });
 *
 * @alias module:Divhide/Obj/traverse
 * @type {Function}
 * @protected
 *
 * @param  {Any} value
 * @param  {Object} options
 * @param  {module:Divhide/Obj/traverse~callback} options.callback Function to be called before inner structure traversal (top-down).
 * @param  {module:Divhide/Obj/traverse~callback} options.callbackAfter Function to be called after inner structure traversal (bottom-down).
 * @param  {Any} accumulator
 *
 * @return {Any} The accumulator result
 *
 */
var traverse = function divhide_obj_traverse(value, options, accumulator){

    var extraArgs = arguments.length > 3 ?
        _.slice(arguments, 3) : [];

    options = Safe.object(options, {});

    var tOptions = {
        // callback called on item traversal (top-down)
        callback: Safe.function(options.callback, null),
        // callback called after item traversal (bottom-up)
        callbackAfter: Safe.function(options.callbackAfter, null),
    };

    return recursiveTraversal.apply(
        {}, [ value, tOptions, accumulator, null].concat(extraArgs));

};

module.exports = traverse;
