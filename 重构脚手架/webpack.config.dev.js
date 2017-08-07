/* global __dirname */
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const precss = require('precss')
const autoprefixer = require('autoprefixer')
const postcssImport = require('postcss-import')
const postcssUrl = require('postcss-url')
const path = require('path')
const openBrowserWebpackPlugin = require('open-browser-webpack-plugin')

module.exports = {
    context: __dirname,
    entry: [
        'eventsource-polyfill',
        'webpack-hot-middleware/client?reload=true',
        './src/index'
    ],
    resolve: {
        extensions: ['', '.js', '.jsx', '.scss', '.css']
    },
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js",
        publicPath: "/dist/",
        sourceMapFilename: "[file].map?hash=[hash]"
    },
    externals: {
        jquery:'jQuery'
    },
    devtool: 'cheap-module-eval-source-map',
    module: {
        loaders: [
            {
                test: /\.jsx?/,
                exclude: /node_modules/,
                loader: "babel"
			}, {
               test: /.s?css$/,
               exclude: [path.join(__dirname, "/src/Common/css/static"), path.join(__dirname, "/node_modules")],
               loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]_[local]_[hash:5]!sass!postcss')
            }, {
               test: /.s?css$/,
               include: [path.join(__dirname, "/src/Common/css/static"), path.join(__dirname, "/node_modules")],
               loader: ExtractTextPlugin.extract('style', 'css!sass!postcss')
            }, {
                test: /[^@]\.(png|jpg|jpeg|gif|svg)(\?.*)?$/,
                loader: 'url?name=img/[name].[ext]&limit=10240'
            }
		]
	},
    postcss: function(webpack){
        return [
                postcssImport({
                    addDependencyTo: webpack
                }),
                postcssUrl(),
                precss,
                autoprefixer
            ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new ExtractTextPlugin("style.css"),
        new webpack.HotModuleReplacementPlugin(),
        new openBrowserWebpackPlugin({ url: 'http://localhost:8888' })
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false,
        //         screw_ie8 : false
        //     },
        //     mangle: {
        //         screw_ie8: false
        //     },
        //     output: { screw_ie8: false }
        // })
    ]
};
