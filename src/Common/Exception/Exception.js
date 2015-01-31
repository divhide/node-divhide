"use strict";

var _           = require("lodash"),
    Type        = require("../Type"),
    Safe        = require("../Safe"),
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
Internal.getI18NMessage = function(message, messageData){

    messageData = Safe.object(messageData);

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
 * @class Error Class
 *
 * @param {String|I18NString} message
 *
 */
var Exception = function(message, messageData) {

    message     = Internal.getI18NMessage(message, messageData);
    messageData = Safe.object(messageData);

    /// initialize the Error.message
    this.message = message.toString();

    /**
     *
     * ToString method with i18n support
     *
     * @param  {Object} translations
     *
     * @return {String}
     *
     */
    this.toString = function(translations){
        return message.toString(translations);
    };

};

Exception.prototype = new Error();
Exception.prototype.constructor = Exception;

module.exports = Exception;
