const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')


module.exports = {
    mode: "development",
    devtool: "source-map",
    devServer: {
        host: 'localhost',
        port: '8081',
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        historyApiFallback: true
    },
    entry: [path.join(__dirname, '/index.tsx')],
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                react: {
                    test: /\/node_modules\/react/,
                    name: 'react',
                    priority: 1
                },
                vendors: {
                    name: 'vendors',
                }
            },
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'babel-loader',
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader',
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                },
            },
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "less-loader",
                    options: {
                        javascriptEnabled: true
                    }
                }]
            },
            {
                test: /\.css$/,
                loader: 'style-loader'
            }
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    output: {
        filename: '[name].js',
        path: `${process.env.PWD}/public/js/chat-agency`,
    },
    plugins: [
        
        new ServiceWorkerWebpackPlugin({
            entry: path.join(__dirname, 'sw.ts')
        }),
        new WebpackPwaManifest(
            {
                filename: "manifest.json",
                name: "App",
                orientation: "portrait",
                display: "standalone",
                start_url: "/admin/chat",
                fingerprints: false,
                inject: true,
                gcm_sender_id: '147228716573'
            }

        ),
        new HtmlWebpackPlugin({
            template: `${process.env.PWD}/resources/js/chat-agency/index.html`
        })
    ]
};