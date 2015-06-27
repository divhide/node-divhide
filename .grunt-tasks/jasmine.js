
var jasmine = {

    test: {
        
        options: {

            vendor: [
                "test/divhide-libs.js",
                "test/divhide.js"
            ],

            specs: [
                'src/*JasmineSpec.js',
                'src/**/*JasmineSpec.js'
            ],

            outfile: 'test/index.html',
            keepRunner: true

        }

    }


};

module.exports = jasmine;