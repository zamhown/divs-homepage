/* eslint-disable no-undef, no-unused-vars */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');  //打包html的插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: {
        index: './src/index.js'
    },
    output: {
        filename: 'js/[name].[hash].bundle.js',
        chunkFilename: 'js/[name].[hash].bundle.js',
        path: path.resolve(__dirname, '../docs')
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader'
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        babelrc: false,  // 不采用.babelrc的配置
                        plugins: [
                            'syntax-dynamic-import'
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it use publicPath in webpackOptions.output
                            publicPath: '../'
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            url: true,
                            modules: 'global'
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2|mp4|ico)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name (file) {
                                return '[path][name].[ext]?[hash]';
                            }
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use:[
                    {
                        loader: 'html-loader',
                        options: {
                            attrs: [
                                'img:src',
                                'link:href',
                                'video:src',
                                'video:poster'
                            ]  //此处的参数值，img是指html中的<img/>标签，src是指img的src属性，表示html-loader作用于img标签中的src的属性
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            minify:{
                collapseWhitespace: true
            },
            chunks: ['index'],
            filename: 'index.html',
            template: './src/layout/index.html'  
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash].css'
        })
    ]
};