
var _ = require("lodash");

/**
 *
 * Apply the browserify post bundle changes.
 *
 * @param  {Error}    err
 * @param  {Buffer}   src
 * @param  {Function} next
 * @param  {Object}   options
 * @return
 *
 */
var postBundleCB = function(err, src, next){

    /// Browserify Shim. This will try to fix different javascript
    /// platform incompatibilities.
    var shim = [
        "\"use strict\";",
        "\n",
        "/// lodash titanium shim. If window is undefined set global variable",
        "var global = undefined, isBrowser = false;",
        "try{ isBrowser = (window !== undefined); }catch(e){}",
        "if(!isBrowser){ global = this; global.global = global; }",
        "\n",
    ].join("\n");

    src = Buffer.concat([
        new Buffer(shim),
        src
    ]);

    next(err, src);
};

/**
 *
 * The grunt browserify configuration
 *
 * @type {Object}
 *
 */
var Browserify = {

    /**
     *
     * Distribution configuration
     *
     * @type {Object}
     */
    dist: {

        files: {
            'dist/divhide.js': [
                'src/Index.js'
            ]
        },

        options: {

            exclude: [ "src/**/*Spec.js" ],
            postBundleCB: postBundleCB,
            browserifyOptions: {
                standalone: "Divhide",
                debug: false,
            }

        }

    },

    /**
     *
     * Test configuration
     *
     * @type {Object}
     *
     */
    test: {

        files: {
            'test/divhide.js': [
                'src/SpecIndex.js'
            ]
        },

        options: {

            exclude: [ "src/**/*Spec.js" ],
            postBundleCB: postBundleCB,
            browserifyOptions: {
                standalone: "Divhide",
                debug: true
            }

        }

    }


};

module.exports = Browserify;
