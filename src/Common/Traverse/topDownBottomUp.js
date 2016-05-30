"use strict";

var _ = require("lodash"),
    Type = require("../Type"),
    Safe = require("../Safe"),
    TraverseStack = require("./TraverseStack");

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
var recursiveTraversal = function divhide_obj_traversal_topDownBottomUp_recursiveTraversal(value, options, accumulator, stack){

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
    if(options.topDownFn){

        accumulator = options.topDownFn.apply(
            {}, [ value, _.clone(stackInfo), accumulator ].concat(extraArgs));

        // if transform use the callback result
        value = options.transform ? accumulator : value;

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

            accumulator = recursiveTraversal.apply(
                {}, [ val, options, accumulator, innerStack ].concat(extraArgs) );

            loopIndex++;

        });

    }

    // call callback after iteration
    if(options.bottomUpFn){
        accumulator = options.bottomUpFn.apply(
            {}, [ value, stackInfo, accumulator ].concat(extraArgs) );
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
 * If a circular reference is found the iteration will not skip the structure
 * and continue.
 *
 * @type {Function}
 * @protected
 *
 * @param  {Any} value
 * @param  {Object}     options
 * @param  {Function}   options.topDownFn   Top-Down callback
 * @param  {Function}   options.bottomUpFn  Bottom-Up callback
 * @param  {Boolean}    options.transform   If true use the topDownFn result as the value to iterate to
 * @param  {Any} accumulator
 *
 * @return {Any} The accumulator value
 *
 */
var traverse = function divhide_obj_traversal_topDownBottomUp(value, options, accumulator){

    var extraArgs = arguments.length > 3 ?
        _.slice(arguments, 3) : [];

    options = Safe.object(options, {});

    var tOptions = {
        // callback called on item traversal (top-down)
        topDownFn: Safe.function(options.topDownFn, null),
        // callback called after item traversal (bottom-up)
        bottomUpFn: Safe.function(options.bottomUpFn, null),
        // callback called to transform the value before traversal
        transform: Safe.boolean(options.transform, false)
    };

    return recursiveTraversal.apply(
        {}, [ value, tOptions, accumulator, null].concat(extraArgs));

};

module.exports = traverse;
