"use strict";

var _           = require("lodash"),
    Type        = require("../Type"),
    Coerce      = require("../Coerce"),
    I18NString  = require("../I18N/String"),
    Messages    = require("../I18N/Messages");


/**
 *
 * Internal methods
 *
 * @type {Object}
 *
 */
var Internal = {};

/**
 *
 * Get message
 *
 * @param  {Object} messages
 *
 * @return {I18NMessage}
 *
 */
Internal.getI18NMessage = function Divhide_Exception_getI18NMessage(message, messageData){

    messageData = Coerce.object(messageData);

    if( message instanceof I18NString ){
        return message;
    }

    /// if message is null or empty
    if( Type.isString(message) ){
        return new I18NString(message, messageData, Messages);
    }

    return new I18NString("");

};

/**
 *
 * Get the stack trace
 *
 * @return {String}
 *
 */
Internal.getStackTrace = function Divhide_Exception_getStackTrace(){

    var error    = new Error(),
        stackStr = Coerce.string(error.stack),
        stack    = stackStr.split('\n');

    /// Remove Error message + 2 first lines of the stack trace
    stack.splice(0,3);

    return stack.join('\n');

};

/**
 *
 * Error Class
 *
 * @param {String|I18NString} message
 *
 */
var Exception = function Divhide_Exception(message, messageData) {

    message     = Internal.getI18NMessage(message, messageData);
    messageData = Coerce.object(messageData);

    /// get the stack trace
    var stack = Internal.getStackTrace();

    /// define the error message
    Object.defineProperty(
        this,
        "message",
        {
            get: function(){
                return this.toString();
            },
            configurable: false
        }
    );

    /// define the this.stack to return the created Error
    /// stack
    Object.defineProperty(
        this,
        'stack', {
        get: function() {
            return this.toString() + "\n" + stack;
        },
        configurable: false
    });

    /**
     *
     * ToString method with i18n support
     *
     * @param  {Object} translations
     *
     * @return {String}
     *
     */
    this.toString = function Divhide_Exception_toString(translations){
        return message.toString(translations);
    };

};

Exception.prototype = new Error();
Exception.prototype.constructor = Exception;

module.exports = Exception;
