'use strict';

module.exports = function(grunt) {

    grunt.initConfig({

        'pkg': grunt.file.readJSON('package.json'),

        'jshint'            : require("./.grunt-tasks/jshint.js"),

        'browserify'        : require("./.grunt-tasks/browserify.js"),

        'watch'             : require("./.grunt-tasks/watch.js"),

        'jasmine'           : require("./.grunt-tasks/jasmine.js"),

        'simplemocha'       : require("./.grunt-tasks/simplemocha.js"),

        'karma'             : require("./.grunt-tasks/karma.js"),

        'readme'            : require("./.grunt-tasks/readme.js"),

        'http-server'       : require("./.grunt-tasks/http-server.js"),

        'bump'              : require("./.grunt-tasks/bump.js"),

        'exec'              : require("./.grunt-tasks/exec.js"),

        'coveralls'         : require("./.grunt-tasks/coveralls.js"),

        'jsdoc'             : require("./.grunt-tasks/jsdoc.js")

    });

    // load libs
    require('load-grunt-tasks')(grunt);

    grunt.registerTask('build', [
        'exec:clean',
        'readme',
        'jshint',
        'jsdoc',
        'browserify',
        'simplemocha',
        'karma'
    ]);

    grunt.registerTask('dev', [
        'browserify:test-libs',
        'browserify:test',
        'jasmine:test:build',
        'jsdoc',
        'http-server',
        'watch',
    ]);

    grunt.registerTask('default', [
        'build'
    ]);

    grunt.registerTask('travis', [
        'build',
        'coveralls'
    ]);

    grunt.registerTask('publish', [
        'travis',
        'exec:npm-publish',
        'exec:bower-publish'
    ]);

};