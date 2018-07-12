'use strict'
var webpack = require("webpack");
var path = require('path');
const { VueLoaderPlugin } = require('vue-loader')
module.exports = {
    mode: 'development',
    watch: true,
    entry: [
        './public/modules/account/main.js'
    ],
    output: {
        path: path.resolve(__dirname, '../public'),
        filename: 'account.js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.styl(us)?$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'stylus-loader'
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
}