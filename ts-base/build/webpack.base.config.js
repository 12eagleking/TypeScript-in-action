const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
// const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

// awesome-typescript-loader自带的类型检查插件
const { CheckerPlugin } = require('awesome-typescript-loader')

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'app.js'
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/i,
        use: [
          // {
          //   loader: 'ts-loader',
          //   options: {
          //     transpileOnly: true,
          //   }
          // },
          {
            loader: 'awesome-typescript-loader',
            options: {
              transpileOnly: true,
            }
          }
        ],
        exclude: /node_modules/,
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/tpl/index.html'
    }),
    // new ForkTsCheckerWebpackPlugin(),
    new CheckerPlugin(),
  ]
}