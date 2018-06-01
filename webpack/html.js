const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function (path) {
    return {
        module: {
            rules: [{
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    minimize: true
                }
            }]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: 'public/index.html'
            }),
        ]
    }
};