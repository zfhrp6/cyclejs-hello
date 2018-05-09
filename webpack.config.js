const path = require('path');

const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const isProd = process.env.NODE_ENV === 'prod';

module.exports = {
    mode: isProd ? 'production' : 'development',
    entry: [
        './src/scripts/main.ts',
    ],
    output: {
        path: path.resolve(__dirname, 'public/'),
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
                test: /\.tsx?$/,
                use: ['ts-loader'],
                exclude: [/node_modules/],
            },
            {
                test: /\.js?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: isProd ? ['env'] : []
                        }
                    }
                ],
                exclude: [/node_modules/],
            },
        ]
    },
};
