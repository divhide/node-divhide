"use strict";

var _ = require("lodash"),
    Type = require("../Type"),
    Coerce = require("../Coerce"),
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

    accumulator = Coerce.value(accumulator);

    // initialize stack if it's empty, otherwise the inner loop will set it
    /* jshint -W041 */
    if(stack == null){
        stack = new TraverseStack();
        stack.push(value);
    }

    // get the current stack info
    var stackInfo = stack.currentInfo();

    // call callback before iteration
    if(options.eachFn){
        accumulator = options.eachFn.apply(
            {}, [ value, _.clone(stackInfo), accumulator ].concat(extraArgs));
    }

    // if tranform set the iteration value
    if(options.eachFn && options.transform){
        value = accumulator;
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

            // if transform set the value index
            if(options.transform){
                value[index] = accumulator;
            }

            loopIndex++;

        });

    }

    // call callback after iteration
    if(options.afterEachFn){
        accumulator = options.afterEachFn.apply(
            {}, [ value, stackInfo, accumulator ].concat(extraArgs) );
    }

    // return the modified value if transform
    if(options.transform){
        return value;
    }

    // return the accumulator otherwise
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
 * @param  {Function}   options.eachFn   Top-Down callback
 * @param  {Function}   options.afterEachFn  Bottom-Up callback
 * @param  {Boolean}    options.transform   If true use the eachFn result as the value to iterate to
 * @param  {Any} accumulator
 *
 * @return {Any} The accumulator value
 *
 */
var traverse = function divhide_obj_traversal_topDownBottomUp(value, options, accumulator){

    var extraArgs = arguments.length > 3 ?
        _.slice(arguments, 3) : [];

    options = Coerce.object(options, {});

    var tOptions = {
        // callback called on item traversal (top-down)
        eachFn: Coerce.function(options.eachFn, null),
        // callback called after item traversal (bottom-up)
        afterEachFn: Coerce.function(options.afterEachFn, null),
        // callback called to transform the value before traversal
        transform: Coerce.boolean(options.transform, false)
    };

    return recursiveTraversal.apply(
        {}, [ value, tOptions, accumulator, null].concat(extraArgs));

};

module.exports = traverse;
