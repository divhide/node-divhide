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
     * Schema
     */
    Schema: function Schema(options){ _.extend(this, options); },

    /**
     * SchemaDefinition
     */
    SchemaDefinition: function SchemaDefinition(options){ _.extend(this, options); },

    /**
     * SchemaEvaluator
     */
    SchemaEvaluator: function SchemaEvaluator(options){ _.extend(this, options); },

    /**
     * SchemaResult
     */
    SchemaResult: function SchemaResult(options){ _.extend(this, options); },

    /**
     * SchemaResultNode
     */
    SchemaResultNode: function SchemaResultNode(options){ _.extend(this, options); }

};

module.exports = Types;