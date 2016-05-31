'use strict';

var _    = require("lodash"),
    Type = require("../Type"),
    Coerce = require("../Coerce");

/**
 * The ChainFunction wraps the functionality of a function executed
 * on a chain context.
 *
 * @param {Object} options
 *
 * @example
 * new ChainFunction({
 *     fn   : function(){},
 *     args : []
 * });
 *
 */
var ChainFunction = function divhide_chain_ChainFunction(options){

    options = Coerce.object(options);

    this.name   = Coerce.string(options.name, "?");
    this.fn     = Coerce.function(options.fn, function(){});
    this.args   = Coerce.array(options.args);

};

/**
 *
 * Execute the function within the context of the given scope and args.
 *
 * The arguments of the function will be the concatenation of the given
 * args and the instance arguments.
 *
 * @param  {*} scope
 * @param  {*} args
 * @param  {*} extraArgs
 *
 * @return {*}
 *
 */
ChainFunction.prototype.apply = function divhide_chain_ChainFunction_apply(scope, args, extraArgs) {

    scope       = Coerce.object(scope);
    args        = Coerce.array(args);
    extraArgs   = Coerce.array(extraArgs);

    /// the given args should always exist
    if(args.length === 0) args = [ null ];

    /// concatenate the given arguments with the instance
    args = args.concat(this.args).concat(extraArgs);

    /// execute function with obj scope and the given arguments
    return this.fn.apply(scope, args);

};


module.exports = ChainFunction;
