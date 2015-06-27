'use strict';

describe("UrlSpec", function () {

    beforeEach(function () {
        jasmine.addMatchers(window.JasmineCustomMatchers);
    });

    it(".isAbsolute()", function (done) {

        var Url = Divhide.Url;

        var url = new Url("http://a.com/?a=1&b=2");
        expect(url.isAbsolute()).toEqual(true);

        done();

    });


    it(".baseUrl()", function (done) {

        var Url = Divhide.Url;

        var url = new Url("http://a.com/?a=1&b=2");
        expect(url.baseUrl()).toEqual("http://a.com/");

        done();


    });


    it(".path()", function (done) {

        var Url = Divhide.Url;

        var url = new Url("http://a.com/?a=1&b=2");
        expect(url.path()).toEqual("");

        done();

    });


    it(".toString()", function (done) {

        var Url = Divhide.Url;

        var url = new Url("http://a.com/?a=1&b=2");
        expect(url.toString()).toEqual("http://a.com/?a=1&b=2");

        url = new Url("");
        expect(url.toString()).toEqual("");

        url = new Url(null);
        expect(url.toString()).toEqual("");

        done();

    });


    it(".setPath()", function (done) {

        var Url = Divhide.Url;

        var url = new Url("http://a.com/a/");
        url.setPath("/b/");
        expect(url.toString()).toEqual("http://a.com/b/");

        url = new Url("http://a.com/a/index.php");
        url.setPath("b/a.php?a=aaaaa");
        expect(url.toString()).toEqual("http://a.com/a/b/a.php?a=aaaaa");

        url = new Url("/a/");
        url.setPath("b/a.php?a=aaaaa");
        expect(url.toString()).toEqual("/a/b/a.php?a=aaaaa");

        url = new Url("http://a.com/a/");
        url.setPath("");
        expect(url.toString()).toEqual("http://a.com/a/");

        url = new Url("http://a.com/a/");
        url.setPath(null);
        expect(url.toString()).toEqual("http://a.com/a/");

        done();

    });


    it(".protocol()", function (done) {

        var Url = Divhide.Url;

        var url = new Url("http://a.com/a/");
        expect(url.protocol()).toEqual("http");

        done();

    });


    it(".filepath()", function (done) {

        var Url = Divhide.Url;

        var url = new Url("http://a.com/a?one=1");
        expect(url.filepath()).toEqual("http://a.com/a");

        done();

    });


    it(".filename()", function (done) {

        var Url = Divhide.Url;

        var url = new Url("http://a.com/a?one=1");
        expect(url.filename()).toEqual("a");

        done();


    });




});