const path = require("path");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: "./js/phonebook.js",
    target: ["web", "es5"],
    devtool: "source-map",
    output: {
        filename: "script.js",
        path: path.resolve(__dirname, "..", "public")
        // publicPath: ""
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "style.css"
        })
    ],

    module: {
        rules: [{
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader, "css-loader"
            ]
        }, {
            test: /\.(png|jpg|gif|svg|ttf|eot|woff)$/,
            use: "file-loader?name=[path][name].[ext]?[contenthash]"
        }]
    }
}