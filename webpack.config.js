const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const CSSModuleLoader = {
    loader: 'css-loader',
    options: {
        modules: true,
        sourceMap: true,
        localIdentName: '[local]__[hash:base64:5]',
        minimize: true
    }
};

const CSSLoader = {
    loader: 'css-loader',
    options: {
        modules: false,
        sourceMap: true,
        minimize: true
    }
};

const postCSSLoader = {
    loader: 'postcss-loader',
    options: {
        ident: 'postcss',
        sourceMap: true,
        plugins: () => [
            autoprefixer({
                browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9']
            })
        ]
    }
};

module.exports = {
    mode: 'development',
    entry: {
        nodeApp: './front/main.js'
    },
    output: {
        filename: '[name].min.js',
        path: path.resolve(__dirname, './public/node-app/'),
        publicPath: '/public/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: path.resolve(__dirname, 'node_modules'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.js$/,
                exclude: path.resolve(__dirname, 'node_modules'),
                loader: 'eslint-loader'
            },
            {
                test: /\.scss$/,
                exclude: /\.module\.scss$/,
                use: ['style-loader', CSSLoader, postCSSLoader, 'sass-loader']
            },
            {
                test: /\.module\.scss$/,
                use: [
                    'style-loader',
                    CSSModuleLoader,
                    postCSSLoader,
                    'sass-loader',
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'img'
                    }
                }
            },
            {
                test: /\.(ttf|woff2|woff|eot)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts'
                    }
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin()
    ]
};