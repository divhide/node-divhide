'use strict';

/**
 * @module Divhide/Coerce
 */

var _       = require('lodash'),
    Type    = require('./Type');


var Internal = {};

/**
 *
 * The regular expression format
 *
 * @type {RegExp}
 *
 */
Internal.RegExpFormat = /^\/.*\/(\w*)$/;

/**
 *
 * Converts a strings to a RegExp
 *
 * @param  {String} str
 * @return {RegExp}
 */
Internal.stringToRegExp = function Divhide_Coerce_Internal_stringToRegExp(str){

    str = Coerce.string(str);

    var flags = "",
        regexp = Internal.RegExpFormat.exec(str);

    if(regexp){

        /// if the string is on // format remove the references
        str = str.replace(/^\//, "")
                .replace(/\/$/, "")
                .trim();

        flags = regexp[1];

    }
    else {
        /// strict search
        str = "^" + str + "$";
    }

    return new RegExp(str, flags);

};


var Coerce = {};

/*
 * Coercelly get array from value
 *
 * @param {*} value The value to get
 * @param {*} defaultValue The value to get
 *
 * @return {Array}
 *
 */
Coerce.array = function Divhide_Coerce_array(value, defaultValue){

    /// if value is null and there is a default value, then
    /// fallback
    /* jshint -W041 */
    if(value == null && defaultValue != null){
        return Coerce.array(defaultValue);
    }

    var isArray = Type.isArray(value);

    /* jshint -W041 */
    if(!isArray && value != null){
        value = [value];
    }
    else if(!isArray && value == null){
        value = [];
    }

    return value;

};

/*
 * Coercelly get Boolean from value
 *
 * @param {*} value The value to get
 *
 * @return {Boolean}
 *
 */
Coerce.boolean = function Divhide_Coerce_boolean(value, defaultValue){

    if(Type.isBoolean(value)){
        return Boolean(value);
    }

    /// fallback to the default value
    if(defaultValue !== undefined){
        return Coerce.boolean(!!defaultValue);
    }

    /// if is Number
    if(Type.isNumber(value)){
        value = Number(value);
        return Boolean(value);
    }

    /// if is String
    if(Type.isString(value)){
        return !!value;
    }

    return !Type.isEmpty(value);

};


/*
 * Coercelly get Boolean from value
 *
 * @param {*} value
 * @param {*} defaultValue
 *
 * @return {String}
 *
 */
Coerce.string = function Divhide_Coerce_string(value, defaultValue){

    if(Type.isString(value)){
        return value;
    }

    return defaultValue !== undefined ?
                Coerce.string(defaultValue) : "";

};


/*
 * Coercelly get Object from value
 *
 * @param {value}           The value to get
 * @param {defaultValue}    The default value
 *
 * @return {Object}
 *
 */
Coerce.object = function Divhide_Coerce_object(value, defaultValue){

    if(Type.isObject(value)){
        return value;
    }

    return defaultValue !== undefined ?
                Coerce.object(defaultValue) : {};

};


/*
 * Coercelly get Number from value
 *
 * @param {*} value The value to get
 * @param {*} defaultValue The default value
 *
 * @return {Number} The number or 0 if was not success
 *
 */
Coerce.number = function Divhide_Coerce_number(value, defaultValue){

    if(Type.isNumber(value)){
        return Number(value);
    }
    else {
        return  defaultValue !== undefined ?
                Coerce.number(defaultValue) : 0;
    }

};


/*
 * Coercelly get Function from value
 *
 * @param {*} value         The value to get
 * @param {*} defaultValue  The value to get
 *
 * @return {Function}
 *
 */
Coerce.function = function Divhide_Coerce_function(value, defaultValue){

    if(Type.isFunction(value)){
        return value;
    }

    if( Type.isFunction(defaultValue) ){
        value = defaultValue;
    }

    if(!value){
        value = function(){ };
    }

    return value;

};


/*
 * Coercelly get the value. This never return undefined!
 *
 * @param {*} value         The value to get
 * @param {*} defaultValue  The value to get
 *
 * @return {*}
 *
 */
Coerce.value = function Divhide_Coerce_value(value, defaultValue){

    if(Type.isDefined(value)){
        return value;
    }

    if( Type.isDefined(defaultValue) ){
        return Coerce.value(defaultValue);
    }

    return null;

};

/**
 *
 * Coercelly gets an instance of the Class. If the value is an instance of Class
 * return it, otherwise return a new instance.
 *
 * @param  {Object} value
 * @param  {Function} Class
 * @param  {Array} args
 *
 * @return {Object}
 *
 */
Coerce.instance = function Divhide_Coerce_instance(value, Class){

    value   = Coerce.object(value);
    Class   = Coerce.function(Class);

    if(value instanceof Class){
        return value;
    }
    else {
        return new Class();
    }

};


/**
 *
 * Coercelly gets the RegExp
 *
 * @param {*} value
 * @param {*} defaultValue
 *
 * @return {}
 *
 */
Coerce.regexp = function Divhide_Coerce_regex(value, defaultValue){

    if(Type.isString(value)){
        return Internal.stringToRegExp(value);
    }

    if(Type.isRegExp(value)){
        return value;
    }

    if(Type.isDefined(defaultValue)){
        return Coerce.regexp(defaultValue);
    }

    return Internal.stringToRegExp();

};

/**
 *
 * Coercelly get the length of the object
 *
 * @param {*} val
 *
 * @return {Number}
 */
Coerce.length = function Divhide_Coerce_length(val){

    if( Type.isString(val) || Type.isArray(val) ){
        return val.length;
    }

    if( Type.isObject(val) ){
        return _.keys(val).length;
    }

    if( Type.isNumber(val) ){
        return val;
    }

    if( Type.isBoolean(val) ){
        return val ? 1 : 0;
    }

    return 0;

};


/**
 *
 * Coerce the given value from the expected value
 *
 * @param  {*} value    The value to coerce
 * @param  {*} expected An instance of the expected value
 * @return {*}
 *
 */
Coerce.coerce = function Divhide_Coerce_coerce(value, expected){

    var expectedType    = Type.of(expected),
        type            = Type.of(value);

    if(expectedType === type){
        return value;
    }

    // Expecting a number
    if(Type.isNumber(expected)){

        if(Type.isNumber(value)){
            return Number(value);
        }

    }

    // Expecting a string
    if(Type.isString(expected)){

        if(Type.isNumber(value)){
            return value.toString();
        }

    }

    // Expecting a boolean
    if(Type.isBoolean(expected)){

        /// try to get it from a number
        if(Type.isNumber(value)){

            value = Coerce.number(value);
            if(value === 1){
                return Boolean(true);
            }
            else if(value === 0){
                return Boolean(false);
            }

        }
        /// try to get it from a string
        else if(Type.isString(value)){

            value = value.toLowerCase();

            if(value == "true"){
                return Boolean(true);
            }
            else if(value == "false"){
                return Boolean(false);
            }

        }

    }

    return value;

};

module.exports = Coerce;
