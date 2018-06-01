const path = require('path');
const merge = require('webpack-merge');
const devServer = require('./webpack/devserver');
const html = require('./webpack/html');
const sassDev = require('./webpack/devsass');
const sassProd = require('./webpack/prodsass');
const babel = require('./webpack/bable');
const uglifyJS = require('./webpack/uglify');
const media = require('./webpack/media');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const PATHS = {
    source: path.resolve(__dirname, 'src'),
    build: path.resolve(__dirname, 'build'),
    publicPath: '/'
};

const common = merge([
    {
        entry : PATHS.source,
        output: {
            path: PATHS.build,
            filename: 'static/[name].[chunkhash:8].js',
        }
    },
    html(PATHS.source),
    babel(PATHS.source),
    media(),
    {
        plugins: [
            new CleanWebpackPlugin(['build'])
        ],
    }
]);


module.exports = function (env) {
    if (env === 'prod') {
        return merge([
            common,
            sassProd(PATHS.source),
            uglifyJS()
        ]);
    }
    if (env === 'dev') {
        return merge([
            common,
            devServer(),
            sassDev(PATHS.source)
        ])
    }
};