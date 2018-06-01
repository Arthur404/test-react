require('ignore-styles');
require('babel-register')({
    ignore: [ /(node_modules)/ ],
    presets: ['env', 'es2015', 'stage-0']
});
module.exports = require('./index');
