const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin =
    require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';
    const config = {
        stats: {
            colors: true,
            modules: true,
            reasons: true,
            errorDetails: false,
        },
        target: 'node',
        entry: {
            main: ['./src/index.ts'],
        },
        output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, 'dist'),
            clean: true,
        },
        externalsPresets: { node: true }, // In order to ignore built-in modules like path, fs, etc.
        externals: [{ mongoose: 'commonjs mongoose' }],
        //Development error
        // externals: [
        //     nodeExternals({
        //         modulesFromFile: {
        //             fileName: './package.json',
        //             includeInBundle: [],
        //             excludeFromBundle: [],
        //         },
        //     }),
        //     // Exclude mongoose explicitly if needed
        //     'mongoose',
        // ],
        devtool: isProduction ? false : 'inline-source-map',
        mode: isProduction ? 'production' : 'development',
        watch: isProduction ? false : true,
        plugins: [
            new CleanWebpackPlugin(),
            new webpack.ProgressPlugin(),
            new Dotenv(),
        ],
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
            fallback: {
                fs: false,
                net: false,
                tls: false,
            },
        },
        devServer: isProduction
            ? {}
            : {
                  static: {
                      directory: path.join(__dirname, 'dist'),
                  },
                  compress: true,
                  open: true,
                  port: 9000,
              },

        optimization: isProduction
            ? {
                  splitChunks: {
                      chunks: 'all',
                  },
              }
            : {},
        module: {
            // rules: [
            //     {
            //         test: /\.ts$/, // Use ts-loader for TypeScript files
            //         exclude: /node_modules/,
            //         use: 'ts-loader',
            //     },
            // ],
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    [
                                        '@babel/preset-env',
                                        { targets: 'defaults' },
                                    ],
                                ],
                            },
                        },
                        {
                            loader: 'ts-loader',
                            options: {
                                transpileOnly: true,
                            },
                        },
                    ],
                },
            ],
        },
    };
    if (isProduction) {
        config.plugins = [
            ...config.plugins,
            new CompressionPlugin({
                test: /\.(css|js)$/,
                algorithm: 'brotliCompress',
            }),
            new BundleAnalyzerPlugin(),
        ];
    }
    return config;
};
