
var watch = {

    scripts: {
        files: [
            "src/**/*.js",
            ".readme/**/*.js",
        ],
        tasks: [
          'browserify'
        ],
        options: {
            interrupt: true,
        }
    }

};

module.exports = watch;