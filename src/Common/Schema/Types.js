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
    Schema: function Divhide_Schema_Types_Schema(options){ _.extend(this, options); },

    /**
     * SchemaDefinition
     */
    SchemaDefinition: function Divhide_Schema_Types_SchemaDefinition(options){ _.extend(this, options); },

    /**
     * SchemaEvaluator
     */
    SchemaEvaluator: function Divhide_Schema_Types_SchemaEvaluator(options){ _.extend(this, options); },

    /**
     * SchemaResult
     */
    SchemaResult: function Divhide_Schema_Types_SchemaResult(options){ _.extend(this, options); },

    /**
     * SchemaResultNode
     */
    SchemaResultNode: function Divhide_Schema_Types_SchemaResultNode(options){ _.extend(this, options); }

};

module.exports = Types;