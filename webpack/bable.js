module.exports = function (path) {
    return {
        module: {
            rules: [{
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                include: path
            }]
        }
    }
};