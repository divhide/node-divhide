
var jasmine = {

    lib: {

        options: {

            vendor: [
                "test/divhide-libs.js",
                "test/divhide.js"
            ],

            specs: [
                'src/*JasmineSpec.js',
                'src/**/*JasmineSpec.js'
            ],

            outfile: 'test/common.html',
            keepRunner: true

        }

    }


};

module.exports = jasmine;