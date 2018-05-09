const path = require('path');

const isProd = process.env.NODE_ENV === 'prod';

module.exports = {
    mode: isProd ? 'production' : 'development',
    entry: [
        './src/scripts/main.ts',
    ],
    output: {
        path: path.resolve(__dirname, '../public/'),
        filename: 'app.js',
    },
    cache: !isProd,
    resolve: {
        extensions: ['.ts', '.js'],
        modules: ['node_modules'],
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: ['ts-loader'],
                exclude: [/node_modules/],
            },
        ]
    },
};
