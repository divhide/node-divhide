"use strict";

module.exports = function(config) {

    config.set({

        basePath : './',

        frameworks : [
            "jasmine"
        ],

        reporters: [
            'progress',
            'dots',
            'coverage',
            'threshold'
        ],

        files : [
            'out/jasmine/divhide-libs.js',
            'out/jasmine/divhide-coverage.js',
            'src/**/*JasmineSpec.js',
        ],

        browsers : ['PhantomJS'],

        autoWatch : true,
        logLevel: "LOG_DEBUG",
        singleRun: true,

        coverageReporter: {
            dir: 'out/jasmine/',
            reporters: [
                { type: 'text-summary' },
                { type: 'lcov', subdir: './' }
            ]
        },

        thresholdReporter: {
            statements: 90,
            branches: 90,
            functions: 90,
            lines: 90
        }

    });

};