var webpack = require('webpack'),
    path = require('path');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

require('dotenv').config({ path: '.env' });

var srcPath  = path.join(__dirname, '/assets/javascripts/')
var distPath = path.join(__dirname, '/public/javascripts/')

const RECEIVER = process.env.RECEIVER;
if (!RECEIVER) throw new Error('Please, set receiver address to RECEIVER env variable')
const VYNOS_URL = process.env.VYNOS_URL;
if (!VYNOS_URL) throw new Error('Please, set url to Vynos to VYNOS_URL env variable')

module.exports = {
    context: srcPath,
    entry: {
        faucet: './faucet.js',
        paid: './paid.js',
        main: './main.js',
    },
    output: {
        path: distPath,
        filename: '[name].bundle.js',
    },
    resolve: {
        modules: ["node_modules"],
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            "window.RECEIVER": JSON.stringify(RECEIVER),
            "window.GATEWAY_URL": JSON.stringify(GATEWAY_URL),
            "window.VYNOS_URL": JSON.stringify(VYNOS_URL),
            "window.ETHEREUM_API": JSON.stringify(ETHEREUM_API)
        })
    ],
    module: {
        loaders: [
            {
                test: /\.ts?$/,
                loader: 'ts-loader'
            },
            {
                test: /\.handlebars$/,
                loader: "handlebars-loader"
            }
        ]
    }
};
