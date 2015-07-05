'use strict';

module.exports = function(grunt) {

    grunt.initConfig({

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

        'coveralls'         : require("./.grunt-tasks/coveralls.js")

    });

    // load libs
    require('load-grunt-tasks')(grunt);

    grunt.registerTask(
        'default',
        [
            'readme',
            'jshint',
            'browserify',
            'simplemocha',
            'karma'
        ]);

    grunt.registerTask(
        'travis',
        [
            'default',
            'coveralls'
        ]);

    grunt.registerTask(
        'test',
        [
            'browserify:test-libs',
            'browserify:test',
            'http-server',
            'watch',
        ]);

    grunt.registerTask(
        'pre-release',
        [
            'travis',
            'bump:prerelease'
        ]);

    grunt.registerTask(
        'patch',
        [
            'travis',
            'bump:patch'
        ]);

    grunt.registerTask(
        'publish',
        [
            'travis',
            'exec:npm-publish',
            'exec:bower-publish'
        ]);

};