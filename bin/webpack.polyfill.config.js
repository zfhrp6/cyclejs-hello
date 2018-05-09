const path = require('path');

module.exports = {
    mode: 'production',
    entry: [
        './public/app.js',
    ],
    output: {
        path: path.resolve(__dirname, '../public/'),
        filename: 'app.js',
    },
    cache: false,
    resolve: {
        extensions: ['.ts', '.js'],
        modules: ['node_modules'],
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                use: ['babel-loader'],
                exclude: [/node_modules/],
            },
        ]
    },
};
