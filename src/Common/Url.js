'use strict';

/**
 * @module Divhide/Url
 */

var _           = require("lodash"),
    UrlParser   = require("./Url/Parser");


/**
 * Provides simple Url manipulation functionalities.
 *
 * @param {String} url The Url
 *
 */
var Url = function(url){

    url = UrlParser.normalize(url);

    var _this = {

        /**
         * Tests if the url is absolute
         *
         * @method isAbsolute
         * @for Divhide.Url
         *
         * @return {Boolean}
         *
         */
        isAbsolute: function(){
            return UrlParser.isAbsolute(url);
        },

        /**
         * Gets the baseUrl
         *
         * @return {String}
         *
         */
        baseUrl: function(){
            return UrlParser.baseUrl(url);
        },

        /**
         * Gets the protocol
         *
         * @return {String}
         *
         */
        protocol: function(){
            return UrlParser.protocol(url);
        },

        /**
         * Gets the path of the url
         *
         * @return {String}
         *
         */
        path: function(){
            return UrlParser.path(url);
        },

        /**
         * Gets the file name
         * @return {String}
         */
        filename: function(){
            return UrlParser.filename(url);
        },

        /**
         * Gets the file path
         * @return {String}
         */
        filepath: function(){
            return UrlParser.filepath(url);
        },

        /**
         * Gets the path of the url
         *
         * @return {String}
         *
         */
        setPath: function(path){

            path = UrlParser.normalize(path);

            var isAbsolute = UrlParser.isAbsolute(path);
            if(isAbsolute){ return false; }

            if(path.indexOf("/") === 0){
                url = UrlParser.normalize( _this.baseUrl() + path );
            }
            else{
                url = UrlParser.normalize( _this.baseUrl() + _this.path() + path );
            }

            return true;

        },

        /**
         * Get the URL string representation
         * @return {String}
         */
        toString: function(){
            return UrlParser.normalize(url);
        }

    };


    return _this;

};


module.exports = Url;
