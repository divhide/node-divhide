'use strict';


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
Internal.stringToRegExp = function(str){

    str = Safe.string(str);

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


var Safe = {};

/*
 * Safelly get array from value
 *
 * @param {*} value The value to get
 * @param {*} defaultValue The value to get
 *
 * @return {Array}
 *
 */
Safe.array = function(value, defaultValue){

    /// if value is null and there is a default value, then
    /// fallback
    /* jshint -W041 */
    if(value == null && defaultValue != null){
        return Safe.array(defaultValue);
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
 * Safelly get Boolean from value
 *
 * @param {*} value The value to get
 *
 * @return {Boolean}
 *
 */
Safe.boolean = function(value, defaultValue){

    if(Type.isBoolean(value)){
        return Boolean(value);
    }

    /// fallback to the default value
    if(defaultValue !== undefined){
        return Safe.boolean(!!defaultValue);
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
 * Safelly get Boolean from value
 *
 * @param {*} value
 * @param {*} defaultValue
 *
 * @return {String}
 *
 */
Safe.string = function(value, defaultValue){

    if(Type.isString(value)){
        return value;
    }

    return defaultValue !== undefined ?
                Safe.string(defaultValue) : "";

};


/*
 * Safelly get Object from value
 *
 * @param {value}           The value to get
 * @param {defaultValue}    The default value
 *
 * @return {Object}
 *
 */
Safe.object = function(value, defaultValue){

    if(Type.isObject(value)){
        return value;
    }

    return defaultValue !== undefined ?
                Safe.object(defaultValue) : {};

};


/*
 * Safelly get Number from value
 *
 * @param {*} value The value to get
 * @param {*} defaultValue The default value
 *
 * @return {Number} The number or 0 if was not success
 *
 */
Safe.number = function(value, defaultValue){

    if(Type.isNumber(value)){
        return Number(value);
    }
    else {
        return  defaultValue !== undefined ?
                Safe.number(defaultValue) : 0;
    }

};


/*
 * Safelly get Function from value
 *
 * @param {*} value         The value to get
 * @param {*} defaultValue  The value to get
 *
 * @return {Function}
 *
 */
Safe.function = function(value, defaultValue){

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
 * Safelly get the value. This never return undefined!
 *
 * @param {*} value         The value to get
 * @param {*} defaultValue  The value to get
 *
 * @return {*}
 *
 */
Safe.value = function(value, defaultValue){

    if(Type.isDefined(value)){
        return value;
    }

    if( Type.isDefined(defaultValue) ){
        return Safe.value(defaultValue);
    }

    return null;

};

/**
 *
 * Safelly gets an instance of the Class. If the value is an instance of Class
 * return it, otherwise return a new instance.
 *
 * @param  {Object} value
 * @param  {Function} Class
 * @param  {Array} args
 *
 * @return {Object}
 *
 */
Safe.instanceOf = function(value, Class){

    value   = Safe.object(value);
    Class   = Safe.function(Class);

    if( value instanceof Class )
    {
        return value;
    }
    else
    {
        return new Class();
    }

};


/**
 *
 * Safelly gets the RegExp
 *
 * @param {*} value
 * @param {*} defaultValue
 *
 * @return {}
 *
 */
Safe.regexp = function(value, defaultValue){

    if(Type.isString(value)){
        return Internal.stringToRegExp(value);
    }

    if(Type.isRegExp(value)){
        return value;
    }

    if(Type.isDefined(defaultValue)){
        return Safe.regexp(defaultValue);
    }

    return Internal.stringToRegExp();

};

/**
 *
 * Safelly get the length of the object
 *
 * @param {*} val
 *
 * @return {Number}
 */
Safe.length = function(val){

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
 * Coerce the given value from the expected type
 *
 * @param  {*} value
 * @param  {*} expected
 * @return {*}
 *
 */
Safe.coerce = function(value, expected){

    var expectedType    = Type.of(expected),
        type            = Type.of(value);

    if(expectedType === type){
        return value;
    }

    // Expecting a number
    if( Type.isNumber(expected) ){

        if(Type.isNumber(value)){
            return Number(value);
        }

    }

    // Expecting a string
    if( Type.isString(expected) ){

        if(Type.isNumber(value)){
            return value.toString();
        }

    }

    // Expecting a boolean
    if(Type.isBoolean(expected)){

        /// try to get it from a number
        if(Type.isNumber(value)){

            value = Safe.number(value);
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

module.exports = Safe;
