const path = require('path');
module.exports = {
    entry: {
        'index.js': './js/index.js'
    },
    output: {
        path: path.resolve('dist'),
        filename: 'index.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: "babel-loader",
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: "babel-loader",
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 8080
    }
}
