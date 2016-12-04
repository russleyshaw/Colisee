const webpack = require('webpack');
var path = require("path");

module.exports = {
    entry: "./main.js",
    resolve: {
        root: path.resolve("./"),
        extensions: ["", ".js"],
    },
    output: {
        filename: "bundle.js",
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            { test: /\.html$/, loader: "html" },
            { test: /\.hbs$/, loader: "handlebars" },
            { test: /\.json$/, loader: "json-loader" },
            { test: /\.scss$/, loaders: ["style", "css", "sass"] },
            {
                test: /\.(jpe?g|png|gif)$/i,
                loaders: [
                    "file?hash=sha512&digest=hex&name=[hash].[ext]",
                    "image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=fals",
                ],
            },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            output: {
                comments: false,
            },
        }),
    ],
    devtool: "#inline-source-map",
};