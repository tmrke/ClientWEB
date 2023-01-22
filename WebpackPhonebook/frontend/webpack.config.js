const path = require("path");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {VueLoaderPlugin} = require("vue-loader");

module.exports = {
    entry: "./js/phonebook.js",
    target: ["web", "es5"],
    devtool: "source-map",
    output: {
        filename: "script.js",
        path: path.resolve(__dirname, "..", "public"),
        publicPath: "auto",
    },

    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "styles.css"
        }),
        new VueLoaderPlugin()
    ],

    module: {
        rules: [{
            test: /\.vue$/,
            use: ["vue-loader"]
        }, {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, "css-loader"]
        }, {
            test: /\.(png|jpg|gif|svg|ttf|eot|woff|woff2)$/,
            type: "asset/resource"
        }, {
            test: /\.scss$/,
            use: [
                MiniCssExtractPlugin.loader,
                "css-loader",
                "sass-loader"
            ]
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {presets: ["@babel/preset-env"]}
            }
        }
        ]
    },
    resolve: {
        alias: {
            "vue$": "vue/dist/vue.esm.js"
        }
    }
}