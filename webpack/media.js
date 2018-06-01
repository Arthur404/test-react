module.exports = function () {
    return {
        module: {
            rules: [{
                test: /\.(woff2?|ttf|bmp|eot|svg|png|jpe?g|otf|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'static/media/[name].[ext]',
                }
            }]
        }
    }
};