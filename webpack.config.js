// const presets = process.env.NODE_ENV === 'development' ? ['react-hot','babel-loader'] : ['babel-loader'];
const webpack = require('webpack');
const path = require('path');

const buildDirectory = path.resolve(__dirname, '/public');
const appDirectory = path.resolve(__dirname, '/app');

module.exports = {

  // This is the entry point or start of our react applicaton
  // entry: appDirectory + '/app.js',
  entry: './app/app.js',
  // entry: {
    // app: ["./app/app.js"]
    // html: 'public/index.html'
  // },
  // output: {
  //   path: __dirname,
  //   filename: 'bundle.js',
  //   publicPath: '/public/'
  // },
  output: {filename: 'public/bundle.js'},
  // output: {
  //   path: buildDirectory,
  //   filename: "bundle.js"
  // },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: /app/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["react", "es2015"]
        }
      }
    ]
  },
  // This lets us debug our react code in chrome dev tools. Errors will have lines and file names
  // Without this the console says all errors are coming from just coming from bundle.js
  // devtool: "eval-source-map"
  devtool: "inline-source-map"
  
};
