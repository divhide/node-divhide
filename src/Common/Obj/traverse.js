"use strict";

var _ = require("lodash"),
    Type = require("../Type"),
    Safe = require("../Safe");

/**
 *
 * Traverse the structure using a top-down strategy.
 *
 * @param  {*}          value
 * @param  {Function}   callback
 * @param  {Object}     accumulator
 * @param  {Object}     options
 * @param  {Object}     info
 *
 * @return {*} The accumulator
 *
 */
var recursiveTraversal = function(value, callback, accumulator, options, info){

    var extraArgs = arguments.length > 5 ?
        _.slice(arguments, 5) : [];

    callback = Safe.function(callback);
    accumulator = Safe.value(accumulator);

    options = _.extend({
        runBefore: true,
        runAfter: false
    }, options);

    info = _.extend({
        parent: null,
        index: null,
        level: 1,
        isFirst: true,
        isLast: true
    }, info);

    // call callback before iteration
    if(options.runBefore){
        info = _.extend({}, info, { isBefore: true, isAfter: false });
        accumulator = callback.apply(
            {}, [ value, info, accumulator ].concat(extraArgs) );
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
                {}, [ val, callback, accumulator, options, info ].concat(extraArgs) );

            loopIndex++;

        });

    }

    // call callback after iteration
    if(options.runAfter){
        info = _.extend({}, info, { isBefore: false, isAfter: true });
        accumulator = callback.apply(
            {}, [ value, info, accumulator ].concat(extraArgs) );
    }

    return accumulator;

};

/**
 *
 * Perform a traversal of the given structure calling the
 * given callback before (top-down) and/or after (bottom-up).
 *
 * @param  {*}          value
 * @param  {Function}   callback
 * @param  {*}          accumulator
 *
 * @return {*} The accumulator result
 *
 */
var traversal = function(value, callback, accumulator, options){

    var extraArgs = arguments.length > 4 ?
        _.slice(arguments, 4) : [];

    return recursiveTraversal.apply(
        {}, [ value, callback, accumulator, options, null ].concat(extraArgs));

};

module.exports = traversal;
