
var jasmine = {

    lib: {

        options: {

            vendor: [
                "node_modules/lodash/index.js",
                "test/divhide.js"
            ],

            specs: [
                'src/**/*JasmineSpec.js'
            ],

            outfile: 'test/common.html',
            keepRunner: true

        }

    }


};

module.exports = jasmine;