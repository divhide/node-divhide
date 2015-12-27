
var watch = {

    scripts: {
        files: [
            "src/**/*.js",
            ".grunt-tasks/*.js",
            ".readme/**/*.js",
        ],
        tasks: [
            "exec:clean",
            "browserify:test-libs",
            "browserify:test",
            "jasmine:test:build",
            "jsdoc"
        ],
        options: {
            interrupt: true,
        }
    }

};

module.exports = watch;