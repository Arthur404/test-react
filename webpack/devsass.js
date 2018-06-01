const ExtractTextPlugin = require('extract-text-webpack-plugin');
const cssFilename = 'static/bundle.[contenthash:8].css';

module.exports = function (path) {
    return {
        devtool: 'source-map',
        module: {
            rules: [{
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    publicPath: '../',
                    fallback: {
                        loader: 'style-loader'
                    },
                    use: [{
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            sourceMap: true
                        }
                    }, {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }]
                }),
                include: path,
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