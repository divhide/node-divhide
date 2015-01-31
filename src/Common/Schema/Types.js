"use strict";

var _ = require("lodash");

/**
 *
 * List of internal Schema package Types.
 *
 * This is useful while using the revealing module pattern and wanting
 * at the same time to use strong type checking.
 *
 */
var Types = {

    /**
     *
     * @class
     * Schema
     *
     */
    Schema: function(options){ _.extend(this, options); },

    /**
     *
     * @class
     * SchemaEvaluator
     *
     */
    SchemaEvaluator: function(options){ _.extend(this, options); }

};

module.exports = Types;