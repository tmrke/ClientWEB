const path = require("path");

module.exports = {
    entry: "./js/phonebook.js",

    devtool: "source-map",

    output: {
        filename: "script.js",
        path: path.resolve(__dirname, "..", "public")
        // publicPath: ""
    }
}