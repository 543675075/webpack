const path = require("path")
const webpack =require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports= {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, 'dist'), //动态获取绝对路径
    filename: "bundle.js"
  },
  // 自动打包根目录下的Html文件到dist里
  plugins: [new HtmlWebpackPlugin({
    template: './index.html'
  })],

  module: {
    rules: [
      // CSS-loader只负责加载CSS文件
      { 
        test: /\.css$/, 
        use: ['style-loader' , 'css-loader'] 
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader', // creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
          {
            loader: 'less-loader', // compiles Less to CSS
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              //加载图片时，小于limit,将图片编译成Base64字符串形式。反之需要使用file-loader进行加载,file-loader不要求配置，只要安装
              limit: 13000,
              name: "img/[name].[hash:8].[ext]"
            },
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }
      },
    ]
  },

  devServer: {
    contentBase: './dist',
    inline: true
  }
}