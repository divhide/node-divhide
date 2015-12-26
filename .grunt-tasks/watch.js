
var watch = {

    scripts: {
        files: [
            "src/**/*.js",
            ".grunt-tasks/*.js",
            ".readme/**/*.js",
        ],
        tasks: [
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