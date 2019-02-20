/* eslint-disable no-undef, no-unused-vars */

const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devServer: {
        contentBase: path.join(__dirname)
    },
    devtool: 'source-map'
});