const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        index: './source/index.js',
        about: './source/about.js'
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name]_bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [ // loader 실행은 역순으로 css -> style
                    'style-loader', // 가져온 css를 웹페이지로 입히는 loader
                    'css-loader' // css를 가져오는 loader
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './source/index.html',
            filename: './index.html',
            chunks: ['index']
        }),
        new HtmlWebpackPlugin({
            template: './source/about.html',
            filename: './about.html',
            chunks: ['about']
        })
    ]
}