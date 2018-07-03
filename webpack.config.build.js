const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const WebpackCleanupPlugin = require('webpack-cleanup-plugin')

const listJson = require('./src/js/data/list.json')
const links = {
    absoluteURL: 'http://zehfernandes.com/generativeworldcup2018',
    github: 'https://github.com/zehfernandes/worldcup2018-posters',
    mailto:
        'mailto:ozehfernandes@gmail.com?subject=I want a world cup posters ☝️&body=(send an email if you are interested in buying and soon I will answer you with price and print options.)'
}

module.exports = {
    mode: 'development',
    entry: {
        canvas: './src/js/canvas.js',
        test: './src/js/main.js'
    },
    output: {
        path: __dirname + '/dist',
        filename: `js/[name].${new Date().getTime()}.bundle.js`
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            { test: /\.hbs$/, loader: 'handlebars-loader' }
        ]
    },
    plugins: [
        new WebpackCleanupPlugin(),
        new UglifyJsPlugin({
            test: /\.js($|\?)/i,
            uglifyOptions: {
                compress: {
                    unused: true,
                    dead_code: true, // big one--strip code that will never execute
                    warnings: false, // good for prod apps so users can't peek behind curtain
                    drop_debugger: true,
                    conditionals: true,
                    evaluate: true,
                    drop_console: true, // strips console statements
                    sequences: true,
                    booleans: true
                }
            }
        }),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            server: { baseDir: ['dist'] },
            files: ['./dist/*']
        }),
        new HtmlWebpackPlugin({
            links: links,
            filename: 'single.html',
            template: 'src/single.hbs',
            minify: {
                minifyCSS: true,
                collapseWhitespace: true
            },
            chunks: ['canvas']
        }),
        new HtmlWebpackPlugin({
            links: links,
            data: listJson,
            filename: 'index.html',
            template: 'src/index.hbs',
            minify: {
                minifyCSS: true,
                collapseWhitespace: true
            },
            chunks: ['test']
        }),
        new CopyWebpackPlugin([
            {
                from: __dirname + '/src/css/tachyons.min.css',
                to: __dirname + '/dist/css/tachyons.min.css',
                toType: 'file'
            }
        ]),
        new CopyWebpackPlugin([
            {
                from: __dirname + '/src/fonts/',
                to: __dirname + '/dist/fonts/',
                toType: 'dir'
            }
        ]),
        new CopyWebpackPlugin([
            {
                from: __dirname + '/src/images/',
                to: __dirname + '/dist/images/'
            }
        ]),
        new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i })
    ],
    watch: true,
    devtool: 'source-map'
}
