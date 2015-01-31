"use strict";

/* jshint -W079 */
var expect = require("expect.js");

/**
 *
 * Divhide nodejs smoke tests. The javascript loginc is tested
 * using jasmine and the browser as debugger.
 *
 */
describe('Divhide', function(){

    var Divhide = require("./Index");

    it('Index smoke tests', function(){

        expect(Divhide)
            .to.be.ok();

        expect(Divhide.Schema)
            .to.be.ok();

    });

});