
var jsdoc = {
    compile : {
        src: [
            'src/Index.js',
            'src/Common/*.js',
            'src/Common/**/*.js'
        ],
        options: {
            destination: 'out/doc/',
            recurse: true,
            debug: true
        }
    }
};

module.exports = jsdoc;