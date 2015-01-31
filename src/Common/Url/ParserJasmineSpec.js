'use strict';

describe("SubModules.Url.ParserSpec", function () {

    var Url = Divhide.SubModules.Url.Parser;

    beforeEach(function (done) {

        done();

    });



    it(".queryString() should return a value", function (done) {

        var qs = Url.queryString("http://a.com/?a=1&b=2");
        expect(qs).toEqual("a=1&b=2");

        done();

    });



    it(".queryString() with none qs should return an empty string", function (done) {

        var qs = Url.queryString("http://a.com/");
        expect(qs).toEqual("");

        done();

    });



    it(".queryStringObj() returs an hash", function (done) {

        var qs = Url.queryStringObj("http://a.com/?a=1&b=2");
        expect(qs).not.toEqual(null);
        expect(qs.a).toEqual('1');
        expect(qs.b).toEqual('2');

        done();

    });



    it(".queryStringObj() when empty returs an empty hash", function (done) {

        var qs = Url.queryStringObj("http://a.com/");
        expect(qs).not.toEqual(null);

        done();



    });


    it(".normalize()", function (done) {

        expect(Url.normalize("http://a.com/")).toEqual("http://a.com/");
        expect(Url.normalize("")).toEqual("");
        expect(Url.normalize("default")).toEqual("default");

        done();

    });

    it(".isAbsolute()", function (done) {

        expect(Url.isAbsolute("http://a.com/")).toEqual(true);
        expect(Url.isAbsolute(null)).toEqual(false);
        expect(Url.isAbsolute("")).toEqual(false);
        expect(Url.isAbsolute("/a/com/")).toEqual(false);


        done();

    });


    it(".getBaseUrl()", function (done) {

        var baseUrl = Url.baseUrl("http://google/a/b/asas.assap");
        expect(baseUrl).toBe("http://google/");

        baseUrl = Url.baseUrl("http://google.dev-env.com:9090/a/b/asas.assap");
        expect(baseUrl).toBe("http://google.dev-env.com:9090/");

        baseUrl = Url.baseUrl(null);
        expect(baseUrl).toBe("");

        baseUrl = Url.baseUrl("");
        expect(baseUrl).toBe("");

        baseUrl = Url.baseUrl("a/asas/asasa/asasa");
        expect(baseUrl).toBe("");


        done();

    });


    it(".path()", function (done) {

        var path = Url.path("http://google/a/b/asas.assap");
        expect(path).toBe("a/b/");

        path = Url.path("http://google/a/b/");
        expect(path).toBe("a/b/");

        path = Url.path("http://google/");
        expect(path).toBe("");

        path = Url.path("");
        expect(path).toBe("");

        path = Url.path(null);
        expect(path).toBe("");

        done();

    });


    it(".protocol()", function (done) {

        var path = Url.protocol("http://google/a/b/asas.assap");
        expect(path).toBe("http");

        path = Url.protocol("");
        expect(path).toBe("");

        path = Url.protocol(null);
        expect(path).toBe("");

        done();

    });


    it(".file()", function (done) {



        var filename = Url.filename("http://google/a/b/index.html?asdasdasd");
        expect(filename).toBe("index.html");

        filename = Url.filename("http://google/a/b/index.html");
        expect(filename).toBe("index.html");

        filename = Url.filename("http://google/a/b/");
        expect(filename).toBe("");

        filename = Url.filename("");
        expect(filename).toBe("");

        filename = Url.filename(null);
        expect(filename).toBe("");

        done();


    });


    it(".filepath()", function (done) {


        var filepath = Url.filepath("http://google/a/b/index.html?asdasdasd");
        expect(filepath).toBe("http://google/a/b/index.html");

        filepath = Url.filepath("http://google/a/b/index.html");
        expect(filepath).toBe("http://google/a/b/index.html");

        filepath = Url.filepath("http://google/a/b/");
        expect(filepath).toBe("http://google/a/b/");

        filepath = Url.filepath("");
        expect(filepath).toBe("");

        filepath = Url.filepath(null);
        expect(filepath).toBe("");


        done();


    });



});
