const path = require('path');
const argv = require('yargs').argv;

const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const watch = !!argv.watch;

const babelLoaderOption = {
  loader: 'babel-loader',
  options: {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            node: 'current',
          },
        },
      ],
    ],
  },
};

module.exports = {
  mode: watch ? 'development' : 'production',
  entry: [...(!watch ? ['@babel/polyfill'] : []), './src/scripts/main.ts'],
  output: {
    path: path.resolve(__dirname, 'public/'),
    filename: 'app.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    modules: ['node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [...(!watch ? [babelLoaderOption] : []), 'ts-loader'],
        exclude: [/node_modules/, nodeModulesPath],
      },
      {
        test: /\.jsx?$/,
        use: [babelLoaderOption],
        exclude: [/node_modules/, nodeModulesPath],
      },
    ],
  },
};
