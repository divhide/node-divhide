"use strict";

var _ = require("lodash"),
    Type = require("../Type"),
    Safe = require("../Safe");

/**
 * @namespace Divhide/Obj/traverse
 */

/**
 *
 * Traverse the structure using a top-down strategy.
 *
 * @param  {*}          value
 * @param  {Object}     options
 * @param  {Object}     accumulator
 * @param  {Object}     info
 *
 * @return {*} The accumulator
 *
 */
var recursiveTraversal = function(value, options, accumulator, info){

    var extraArgs = arguments.length > 4 ?
        _.slice(arguments, 4) : [];

    accumulator = Safe.value(accumulator);

    info = _.extend({
        parent: null,
        index: null,
        level: 1,
        isFirst: true,
        isLast: true
    }, info);

    // call callback before iteration
    if(options.callback){
        accumulator = options.callback.apply(
            {}, [ value, _.clone(info), accumulator ].concat(extraArgs) );
    }

    // iterate over the inner elements of complex structures
    if(Type.isComplex(value)){

        var level = info.level + 1,
            loopSize = _.size(value),
            loopIndex = 0;

        _.forEach(value, function(val, index){

            var info = {
                parent: value,
                index: index,
                level: level,
                isLast: loopIndex === (loopSize - 1),
                isFirst: loopIndex === 0
            };

            accumulator = accumulator = recursiveTraversal.apply(
                {}, [ val, options, accumulator, info ].concat(extraArgs) );

            loopIndex++;

        });

    }

    // call callback after iteration
    if(options.callbackAfter){
        accumulator = options.callbackAfter.apply(
            {}, [ value, _.clone(info), accumulator ].concat(extraArgs) );
    }

    return accumulator;

};

/**
 * Structure traversal callback signature. This function is called for every structure
 * value.
 *
 * @callback Divhide/Obj/traverse~callback
 * @param {Any} value
 * @param {Object} info Traversal information
 * @param {Any} info.parent The parent object of the value
 * @param {String|Number} info.index The index of the value (in relation to the parent)
 * @param {Number} info.level The traversal level ( >= 1 )
 * @param {Boolean} info.isFirst Flag to tell if value is the parent's first child
 * @param {Boolean} info.isLast Flag to tell if value is the parent's last child
 * @param {Any} accumulator The traversal accumulator
 */

/**
 *
 * Perform a traversal of the given structure calling the
 * given callback before (top-down) and/or after (bottom-up).
 *
 * @alias module:Divhide/Obj/traverse
 * @type {Function}
 *
 * @param  {Any} value
 * @param  {Object} options
 * @param  {Divhide/Obj/traverse~callback} options.callback Function to be called before inner structure traversal (top-down).
 * @param  {Divhide/Obj/traverse~callback} options.callbackAfter Function to be called after inner structure traversal (bottom-down).
 * @param  {Any} accumulator
 *
 * @return {Any} The accumulator result
 *
 */
var traversal = function(value, options, accumulator){

    var extraArgs = arguments.length > 3 ?
        _.slice(arguments, 3) : [];

    var tOptions = {
        // callback called on item traversal (top-down)
        callback: Safe.function(options.callback, null),
        // callback called after item traversal (bottom-up)
        callbackAfter: Safe.function(options.callbackAfter, null),
    };

    return recursiveTraversal.apply(
        {}, [ value, tOptions, accumulator, null ].concat(extraArgs));

};

module.exports = traversal;
