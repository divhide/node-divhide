
var jasmine = {

    test: {

        options: {

            vendor: [
                "out/jasmine/divhide-libs.js",
                "out/jasmine/divhide.js"
            ],

            specs: [
                'src/*JasmineSpec.js',
                'src/**/*JasmineSpec.js'
            ],

            outfile: 'out/jasmine/index.html',
            keepRunner: true

        }

    }


};

module.exports = jasmine;