"use strict";

var Chain = require("./Chain"),
    Coerce = require("./Coerce"),
    topDownBottomUp = require("./Traverse/topDownBottomUp");

var TraverseChainContext = function Divhide_Traverse_TraverseChainContext(){
    this.eachFn = null;
    this.afterEachFn = null;
    this.transform = false;
};

/**
 * @class
 * Traverse chainable facade provides structure traversing functions.
 *
 */
var TraverseChain = function Divhide_Traverse() {

    var chainableFns = {
        each: function Divhide_Traverse_each(val, fn){
            this.eachFn = Coerce.function(fn, null);
        },
        afterEach: function Divhide_Traverse_afterEach(val, fn){
            this.afterEachFn = Coerce.function(fn, null);
        },
        transform: function Divhide_Traverse_transform(val, isTransform){
            this.transform = Coerce.boolean(isTransform, false);
        },
        accumulator: function Divhide_Traverse_accumulator(val, accumulator){
            this.accumulator = Coerce.value(accumulator);
        },
        options: function Divhide_Traverse_options(val, options){
            this.options = Coerce.value(options);
        }
    };

    var evaluationFns = {
        traverse: function Divhide_Traverse_traverse(value){
            return topDownBottomUp(
                value,
                {
                    eachFn: this.eachFn,
                    afterEachFn: this.afterEachFn,
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
