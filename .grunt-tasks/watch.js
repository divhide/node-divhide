
var watch = {

    scripts: {
        files: [
            "src/**/*.js",
            ".grunt-tasks/*.js",
            ".readme/**/*.js",
        ],
        tasks: [
          'browserify:test',
        ],
        options: {
            interrupt: true,
        }
    }

};

module.exports = watch;