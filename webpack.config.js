module.exports = {
    entry: {
        "detector.min.js": ['./src/index.js']
    },
    output: {
        path: './dist',
        filename: '[name]'
    },
    module: {
        rules: [
            {
                test: /\.(scss)$/,
                loaders: ["style-loader", "css-loader" , "sass-loader"]
            },
            {
                test: /\.((woff(2)?|svg)(\?v=[0-9]\.[0-9]\.[0-9]))|(woff2?|png|ico|woff)$/,
                loader: 'url-loader'
            },
            {
                test: /\.((ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9]))|(ttf|eot)$/,
                loader: 'file-loader'
            },
        ]
    }
};