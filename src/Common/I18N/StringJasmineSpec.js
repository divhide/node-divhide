'use strict';

describe("I18N.StringSpec", function () {

    var I18NString = Divhide.I18N.String;

    beforeEach(function () {
        jasmine.addMatchers(window.JasmineCustomMatchers);
    });
    
    it("Divhide.Specs.I18NStringDocExample", function () {
        Divhide.Specs.I18NStringDocExample();
    });

    it("instanceof String", function (done) {

        var str = new I18NString("");

        expect(str instanceof String)
            .equals(true);

        expect(Divhide.Type.isString(str))
            .equals(true);

        done();

    });

    it(".toString()", function (done) {

        var str, value;

        str = new I18NString("");

        value = str.toString();
        expect(value).equals("");

        str = new I18NString("NAME");

        value = str.toString();
        expect(value).equals("NAME");

        str = new I18NString("<%= value %>", { value: "value" });
        value = str.toString();
        expect(value).equals("value");

        done();

    });

    it(".toString(name, messages, data)", function (done) {

        var str, value;

        str = new I18NString("NAME", { value: "value" }, { "NAME": "<%= value %>" });

        value = str.toString();
        expect(value).equals("value");

        value = str.toString(null);
        expect(value).equals("value");

        value = str.toString({ "NAME": "=<%= value %>" });
        expect(value).equals("=value");

        done();

    });

    it(".toString() invalid template throws Error", function (done) {

        var error = null;

        try{
            var str = new I18NString("NAME", { value: "value" }, { "NAME": "<%= wrong %>" });
            str.toString();
        }
        catch(e){
            error = e;
        }

        expect(error.message).toMatch("Error on template 'NAME':");
        done();

    });


});
