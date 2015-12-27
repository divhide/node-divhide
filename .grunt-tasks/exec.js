"use strict";

var exec = {

    "npm-publish": {
        cmd: "npm pack && find ./ -iname 'divhide-*.tgz' | head | npm publish && rm divhide-*.tgz"
    },

    "bower-publish": {
        cmd: "bower update"
    },

    "clean": {
        cmd: "rm -rf out/"
    }

};

module.exports = exec;