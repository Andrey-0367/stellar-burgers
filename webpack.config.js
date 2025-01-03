const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const production = process.env.NODE_ENV === 'production';

module.exports = {
  mode: 'production',
  devtool: false,
  entry: path.resolve(__dirname, './src/index.tsx'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(ts)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader'
        }
      },
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.module\.css$/i,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      },
      {
        test: /\.(jpg|jpeg|png|svg)$/,
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2)$/,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    new ESLintPlugin({
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new webpack.EnvironmentPlugin({
      PUBLIC_PATH: null, // значение по умолчанию null, если переменная process.env.PUBLIC_PATH не передана
      NODE_ENV: 'development' // значение по умолчанию 'development', если переменная process.env.NODE_ENV не передана
    })
  ],
  resolve: {
    extensions: [
      '*',
      '.js',
      '.jsx',
      '.ts',
      '.tsx',
      '.json',
      '.css',
      '.scss',
      '.png',
      '.svg',
      '.jpg'
    ],
    alias: {
      '@pages': path.resolve(__dirname, './src/pages'),
      '@components': path.resolve(__dirname, './src/components'),
      '@ui': path.resolve(__dirname, './src/components/ui'),
      '@ui-pages': path.resolve(__dirname, './src/components/ui/pages'),
      '@utils-types': path.resolve(__dirname, './src/utils/types'),
      '@api': path.resolve(__dirname, './src/utils/burger-api.ts'),
      '@slices': path.resolve(__dirname, './src/services/slices'),
      '@selectors': path.resolve(__dirname, './src/services/selectors')
    }
  },
  output: {
    path: path.resolve(__dirname, '..', './dist'), // путь, по которому будет собираться наш проект
    filename: production
      ? 'static/scripts/[name].[contenthash].js'
      : 'static/scripts/[name].js', // имя нашего бандла
    publicPath: process.env.PUBLIC_PATH ? process.env.PUBLIC_PATH : '/', // указываем путь, который будет добавляться перед подключением файлов
    chunkFilename: 'static/scripts/[name].[contenthash].bundle.js'
  },
  devServer: {
    static: path.join(__dirname, './dist'),
    compress: true,
    historyApiFallback: true,
    port: 4000
  }
};
