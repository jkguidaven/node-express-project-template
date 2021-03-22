const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');

const { NODE_ENV = 'production' } = process.env;

module.exports = {
    entry: './app.ts',
    mode: NODE_ENV,
    watch: NODE_ENV === 'development',
    target: 'node',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: ['ts-loader']
            }
        ]
    },

    externals: [
        // We will need this so we won't bundle unnecessary codes from node_modules
        nodeExternals()
    ],
    plugins: [
        // Copy our asset folder to build directory
        new CopyPlugin({
            patterns: [
                { from: 'src/static', to: 'src/static' },
                { from: 'src/views', to: 'src/views' }
            ]
        })
    ]
};
