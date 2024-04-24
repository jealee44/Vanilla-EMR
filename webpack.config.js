const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';

module.exports = {
    mode: mode,
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'index.html'),
            filename: 'index.html'
        })
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
            {
                test: /\.s?css$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    devServer: {
        hot: true,
        open: true,
        proxy: [
            {
            context: '/api',
            target: 'http://localhost:3000',
            changeOrigin: true,
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
};