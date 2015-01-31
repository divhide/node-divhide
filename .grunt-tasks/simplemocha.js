
var mocha = {

  options: {
    globals: [],
    timeout: 3000,
    ignoreLeaks: false,
    ui: 'bdd',
    reporter: 'nyan'
  },

  all: [
    'src/**/*MochaSpec.js'
  ]

};

module.exports = mocha;