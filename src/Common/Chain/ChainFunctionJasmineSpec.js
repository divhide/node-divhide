'use strict';

describe("SubModules.Chain.ChainFunctionSpec", function () {


    var ChainFunction = Divhide.SubModules.Chain.ChainFunction;


    beforeEach(function (done) {

        done();

    });


    it('.apply()', function(done){

        var f = new ChainFunction(
            {
                fn: function(i, j){ return i + j + (this.z || 0); },
                args: 10
            });

        var value = f.apply({}, 1);
        expect(value)
            .toBe(11);

        value = f.apply({ z: 1 }, 1);
        expect(value)
            .toBe(12);

        done();

    });


    it('.apply(scope, ?)', function(done){

        /// test the metadata integration
        var f = new ChainFunction(
            {
                fn: function(i, j){ return i + j + (this.z || 0); },
                args: 10
            });

        var value = f.apply({ z: 1 }, 1);
        expect(value)
            .toBe(12);


        done();

    });


    it('apply(?, undefined)', function(done){

        var f = new ChainFunction({
            fn: function(i, j){
                i = i || 1;
                return i + j;
            },
            args: 10
        });

        var value = f.apply({}, undefined);
        expect(value)
            .toBe(11);

        done();

    });



});