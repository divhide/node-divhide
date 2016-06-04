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
var Url = function Divhide_Type_Url(url){

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
        isAbsolute: function Divhide_Url_isAbsolute(){
            return UrlParser.isAbsolute(url);
        },

        /**
         * Gets the baseUrl
         *
         * @return {String}
         *
         */
        baseUrl: function Divhide_Url_baseUrl(){
            return UrlParser.baseUrl(url);
        },

        /**
         * Gets the protocol
         *
         * @return {String}
         *
         */
        protocol: function Divhide_Url_protocol(){
            return UrlParser.protocol(url);
        },

        /**
         * Gets the path of the url
         *
         * @return {String}
         *
         */
        path: function Divhide_Url_path(){
            return UrlParser.path(url);
        },

        /**
         * Gets the file name
         * @return {String}
         */
        filename: function Divhide_Url_filename(){
            return UrlParser.filename(url);
        },

        /**
         * Gets the file path
         * @return {String}
         */
        filepath: function Divhide_Url_filepath(){
            return UrlParser.filepath(url);
        },

        /**
         * Gets the path of the url
         *
         * @return {String}
         *
         */
        setPath: function Divhide_Url_setPath(path){

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
        toString: function Divhide_Url_toString(){
            return UrlParser.normalize(url);
        }

    };


    return _this;

};


module.exports = Url;
