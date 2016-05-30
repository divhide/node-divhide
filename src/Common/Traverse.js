"use strict";

var Chain = require("./Chain"),
    Safe = require("./Safe"),
    topDownBottomUp = require("./Traverse/topDownBottomUp");

var TraverseChainContext = function divhide_Traverse_TraverseChainContext(){
    this.topDownFn = null;
    this.bottomUpFn = null;
    this.transform = false;
};

/**
 * @class
 * Traverse chainable facade provides structure traversing functions.
 *
 */
var TraverseChain = function divhide_Traverse() {

    var chainableFns = {
        topDown: function divhide_Traverse_topDown(val, fn){
            this.topDownFn = Safe.function(fn, null);
        },
        bottomUp: function divhide_Traverse_bottomUp(val, fn){
            this.bottomUpFn = Safe.function(fn, null);
        },
        transform: function divhide_Traverse_transform(val, isTransform){
            this.transform = Safe.boolean(isTransform, false);
        },
        accumulator: function divhide_Traverse_accumulator(val, accumulator){
            this.accumulator = Safe.value(accumulator);
        },
        options: function divhide_Traverse_options(val, options){
            this.options = Safe.value(options);
        }
    };

    var evaluationFns = {
        traverse: function divhide_Traverse_traverse(value){
            return topDownBottomUp(
                value,
                {
                    topDownFn: this.topDownFn,
                    bottomUpFn: this.bottomUpFn,
                    transform: this.transform
                },
                this.accumulator,
                this.options);
        }
    };

    return new Chain(chainableFns, evaluationFns, {
        pipe: false,
        scope: function() {
            return new TraverseChainContext();
        }
    });

};

module.exports = new TraverseChain();
