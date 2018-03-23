const Path = require('path');
const Webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: [Path.resolve(__dirname, './src/main.js')],
  output: {
    filename: 'dist.js', // 打包文件名
    path: `${__dirname}/public/dist`, // webpack本地打包路径,与publicPath作用不同
    // chunkFilename: '[name]-[id]-chunk.js',
    // 运行服务器时的打包文件夹路径,即打包在 "http://网站根目录/dist/"下,通过"http://网站根目录/dist/bundle.js"访问.
    publicPath: '/dist/', // http://www.jb51.net/article/116443.htm  publicPath路径问题详解
  },
  // devtool: 'eval-source-map',
  devServer: {
    contentBase: './public', // webpack-dev-server提供本地服务器的文件夹
    inline: true, // reload
    // historyApiFallback: true, // false 根据路径跳转页面 ; true 路径都返回根index.html
    port: 8080,
    // open: true,
    hot: true,
    watchOptions: {
      aggregateTimeout: 1000,
      ignored: /node_modules/,
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', { loader: 'css-loader' }],
      },
    ],
  },
  plugins: [new Webpack.HotModuleReplacementPlugin(), new UglifyJsPlugin()],
};
