    'use strict';

describe("SubModules.Chain.ChainContextSpec", function () {


    var ChainContext = Divhide.SubModules.Chain.ChainContext;


    beforeEach(function (done) {

        jasmine.addMatchers({
            isEqual: function(expected) {

                return {
                    compare: function(actual, expected) {
                        return { pass: _.isEqual(actual, expected) };
                    }
                };

            }
        });

        done();

    });


    it('.exec()', function(done){

        var context = new ChainContext();

        context.add(function(v, i){ return i + 1; }, [5]);
        context.add();
        context.add(function(v){ return v + 1; });

        var value = context.exec(0);

        expect(value)
            .toBe(0);

        done();

    });


    it('.exec(?) pipe', function(done){

        var context = new ChainContext({ pipe: true });

        context.add(function(v, i){ return i + 1; }, [5]);
        context.add();
        context.add(function(v){ return v + 1; });

        var value = context.exec(0);

        expect(value)
            .toBe(7);

        done();

    });


    it('.exec(?) scope', function(done){

        var context = new ChainContext({ pipe: true, scope: { val:1 } });

        var fn = function(){
            return ++this.val;
        };

        context.add(fn);
        context.add(fn);
        context.add(fn);

        var value = context.exec();

        expect(value)
            .toBe(4);

        done();

    });


    it('.exec(?, err)', function(done){

        var context = new ChainContext();

        context.add(function(v, i){ return i + 1; }, [5]);
        context.add();
        context.add(function(v){ throw new Error(); });

        var error = null;
        var value = context.exec(0, null, function(err){ error = err; });

        expect(value)
            .toBe(null);

        expect(error)
            .not.toBe(null);

        done();

    });


    it('.exec() scope', function(done){

        var context = new ChainContext({ pipe: true });

        var fn = function(){
            this.i = this.i || 0;
            return ++this.i;
        };

        context.add(fn);
        context.add(fn);
        context.add(fn);

        var value = context.exec(null);

        expect(value)
            .toBe(3);

        done();

    });



});
