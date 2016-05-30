'use strict';

/**
 * @namespace Divhide
 * @module Divhide
 *
 */

/**
 *
 * Divhide Library - An isomorphic library for you to use on javascript supported
 * devices.
 *
 * @type Object
 * @alias module:Divhide
 * @enum generators
 */
var Common = {

    /**
     * Type utility
     * @type {module:Divhide/Type}
     */
    Type: require("./Common/Type"),

    /**
     * Safe utility
     * @type {module:Divhide/Safe}
     */
    Safe: require("./Common/Safe"),

    /**
     * Array utility
     * @type {module:Divhide/Arr}
     */
    Arr: require("./Common/Arr"),

    /**
     * Object helper
     * @type {module:Divhide/Obj}
     */
    Obj: require("./Common/Obj"),

    /**
     * I18N utility
     */
    I18N: {

        /**
         * I18NString utility
         */
        String: require("./Common/I18N/String"),

    },

    /**
     *
     * Exceptions package
     *
     */
    Exception: {

        /**
         * Exception Class
         */
        Exception: require("./Common/Exception/Exception"),

        /**
         * ExceptionList
         */
        ExceptionList: require("./Common/Exception/ExceptionList"),

    },

    /**
     * Url utility
     * @type {module:Divhide/Url}
     */
    Url: require("./Common/Url"),

    /**
     * Chain facility
     * @type {module:Divhide/Chain}
     */
    Chain: require("./Common/Chain"),

    /**
     * Default Assertion instance utility. This provides access to the default
     * Assert functions.
     * @type {module:Divhide/Assert}
     */
    Assert: require("./Common/Assert"),

    /**
     * Assertion utility
     * @type {module:Divhide/Assertion}
     */
    Assertion: require("./Common/Assertion"),

    /**
     * Schema utility
     * @type {module:Divhide/Schema}
     */
    Schema: require("./Common/Schema"),

    /**
     * Custom Schema
     * @type {module:Divhide/CustomSchema}
     */
    CustomSchema: require("./Common/CustomSchema"),

    /**
     * Traverse functions
     * @type {module:Divhide/CustomSchema}
     */
    Traverse: require("./Common/Traverse")

};

module.exports = Common;
