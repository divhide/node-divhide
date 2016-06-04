"use strict";

/**
 * @module Divhide/Arr
 */

var _           = require("lodash"),
    Type        = require("./Type"),
    Coerce      = require("./Coerce");


var Arr = {

    /**
     * Get index value
     *
     * @param {Array}   array
     * @param {Number}  index
     *
     * @return {*}
     *
     */
    index: function Divhide_Arr_index(array, index){

        array = Coerce.array(array);
        index = Coerce.number(index);

        if(index < 0 || index > array.length - 1)
            return null;

        return array[index];

    },

    /**
     *
     * Get last value of the array
     *
     * @param {Array}   array
     *
     * @return {Object}
     *
     */
    last: function Divhide_Arr_last(array){

        array = Coerce.array(array);

        return Arr.index(array, array.length - 1);

    },

    /*
     * Get first value of the array
     *
     * @param {Array}   array
     *
     * @return {Object}
     *
     */
    first: function Divhide_Arr_first(array){

        return Arr.index(array);

    },

    /**
     *
     * Returns the length of the array
     *
     * @param {Array}   array
     *
     * @return {Number}
     *
     */
    length: function Divhide_Arr_length(array){

        array = Coerce.array(array);

        return array.length;

    },

    /**
     *
     * Inserts the value in the specified index of the array
     *
     * @param {Array}   array
     * @param {*}       value
     * @param {Number}  index
     *
     * @return {Array}
     *
     */
    insert: function Divhide_Arr_insert(array, value, index){

        array = Coerce.array(array);
        value = Coerce.array(value);

        /* jshint -W041 */
        if(index == null){
            index = Arr.length(array);
        } else {
            index = Coerce.number(index);
        }

        // merge the structures
        _.each(
            value.reverse(),
            function(item){
                array.splice(index, 0, item);
            }
        );

        return array;

    },

    /*
     * Remove index of the array. If no index is specified the first
     * element is removed.
     *
     * Returns the removed elements.
     *
     * @param {Array}   index
     * @param {Number}  index
     * @param {Number}  n
     *
     * @return {Array}
     *
     */
    remove: function Divhide_Arr_remove(array, index, n){

        array   = Coerce.array(array);
        index   = Coerce.number(index, 0);
        n       = Coerce.number(n, 1);

        return array.splice(index, n);

    }

};


module.exports = Arr;

