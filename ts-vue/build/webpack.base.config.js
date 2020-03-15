module.exports = {
  output: {
    filename: 'employee-query.js'
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', 'vue'],
    alias: {
      'vue': 'vue/dist/vue.esm.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.tsx?$/,
        use: [{
          loader: 'ts-loader',
          options: {
            appendTsSuffixTo: [/\.vue$/] // ?
          }
        }],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/tpl/index.html',
    }),
    new VueLoaderPlugin(),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
}