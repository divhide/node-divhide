"use strict";

var _       = require("lodash"),
    Divhide = require("./Index.js");

/**
 *
 * Specs main module.
 *
 * This exposes the specs that are on .readme folder. Note that the
 * spec files are included on the generated documentation
 *
 */
var SpecIndex = _.extend({}, Divhide, {

    /**
     *
     * Expose sub-modules. These will be used for unit-tests
     *
     * @type {Object}
     *
     */
    SubModules: {

        Url: {
            Parser: require("./Common/Url/Parser")
        },

        Assert: {
            Array: require("./Common/Assert/Array"),
            Max: require("./Common/Assert/Max"),
            Min: require("./Common/Assert/Min"),
            Number: require("./Common/Assert/Number"),
            Regex: require("./Common/Assert/Regex"),
            Required: require("./Common/Assert/Required"),
            String: require("./Common/Assert/String"),
            Object: require("./Common/Assert/Object"),
            InstanceOf: require("./Common/Assert/InstanceOf"),
        },

        Chain: {
            ChainContext: require("./Common/Chain/ChainContext"),
            ChainFunction: require("./Common/Chain/ChainFunction"),
        },

        Schema: {

            Types: require("./Common/Schema/Types"),
            SchemaDefinition: require("./Common/Schema/SchemaDefinition"),
            Exception: {
                SchemaException: require("./Common/Schema/Exception/SchemaException")
            },
            Helper: {
                SchemaExecutionHelper: require("./Common/Schema/Helper/SchemaExecutionHelper")
            },
            Mixins: {
                SchemaExecution: require("./Common/Schema/Mixins/SchemaExecution"),
            }
        }

    },

    Specs: {

        ArrExample                  : function() { require("../.readme/includes/Arr/ArrExample"); },
        AssertionExample            : function() { require("../.readme/includes/Assertion/AssertionExample"); },
        AssertExample               : function() { require("../.readme/includes/Assert/AssertExample"); },
        ChainExample                : function() { require("../.readme/includes/Chain/ChainExample"); },
        ExceptionDocExample         : function() { require("../.readme/includes/Exception/ExceptionDocExample"); },
        ExceptionListDocExample     : function() { require("../.readme/includes/Exception/ExceptionListDocExample"); },
        I18NStringDocExample        : function() { require("../.readme/includes/I18N/I18NStringDocExample"); },
        ObjExample                  : function() { require("../.readme/includes/Obj/ObjExample"); },
        CoerceArrayExample          : function() { require("../.readme/includes/Coerce/ArrayExample"); },
        CoerceBooleanExample        : function() { require("../.readme/includes/Coerce/BooleanExample"); },
        CoerceFunctionExample       : function() { require("../.readme/includes/Coerce/FunctionExample"); },
        CoerceLengthExample         : function() { require("../.readme/includes/Coerce/LengthExample"); },
        CoerceNumberExample         : function() { require("../.readme/includes/Coerce/NumberExample"); },
        CoerceObjectExample         : function() { require("../.readme/includes/Coerce/ObjectExample"); },
        CoerceRegexExample          : function() { require("../.readme/includes/Coerce/RegexExample"); },
        CoerceStringExample         : function() { require("../.readme/includes/Coerce/StringExample"); },
        CoerceValueExample          : function() { require("../.readme/includes/Coerce/ValueExample"); },
        SchemaAnyExample            : function() { require("../.readme/includes/Schema/SchemaAnyExample"); },
        SchemaArrayExample          : function() { require("../.readme/includes/Schema/SchemaArrayExample"); },
        SchemaNumberExample         : function() { require("../.readme/includes/Schema/SchemaNumberExample"); },
        SchemaObjectExample         : function() { require("../.readme/includes/Schema/SchemaObjectExample"); },
        SchemaOverview              : function() { require("../.readme/includes/Schema/SchemaOverview"); },
        SchemaStringExample         : function() { require("../.readme/includes/Schema/SchemaStringExample"); },
        SchemaSerializationExample  : function() { require("../.readme/includes/Schema/SchemaSerializationExample"); },
        TypeExample                 : function() { require("../.readme/includes/Type/TypeExample"); },

    }

});

module.exports = SpecIndex;
