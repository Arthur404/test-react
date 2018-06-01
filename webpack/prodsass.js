const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const postcssFlexbugsFixes = require('postcss-flexbugs-fixes');
const cssnano = require('cssnano');
const cssFilename = 'static/bundle.[contenthash:8].css';

module.exports = function (path) {
    return {
        module: {
            rules: [{
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    publicPath: '../',
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader'
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                postcssFlexbugsFixes,
                                cssnano,
                                autoprefixer({
                                    browsers: [
                                        '>1%',
                                        'last 4 versions',
                                        'Firefox ESR',
                                        'not ie < 9',
                                    ],
                                    flexbox: 'no-2009',
                                }),
                            ]
                        }
                    }, {
                        loader: 'sass-loader'
                    }]
                }),
                include: path
            }]
        },
        plugins: [
            new ExtractTextPlugin({
                filename: cssFilename,
                allChunks: true
            }),
        ]
    }
};