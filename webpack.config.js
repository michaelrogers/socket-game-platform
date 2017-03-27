// const presets = process.env.NODE_ENV === 'development' ? ['react-hot','babel-loader'] : ['babel-loader'];
module.exports = {

  // This is the entry point or start of our react applicaton
  // entry: "./app/app.js",
  entry: {
    app: ["./app/app.js"]
    // html: 'public/index.html'
  },
  // output: {
  //   path: __dirname,
  //   filename: 'bundle.js',
  //   publicPath: '/public/'
  // },
  output: {
    filename: "public/bundle.js"
  },

  module: {
    loaders: [{
        // Only working with files that in in a .js or .jsx extension
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["react", "es2015"]
        }
      }]
  },
  // This lets us debug our react code in chrome dev tools. Errors will have lines and file names
  // Without this the console says all errors are coming from just coming from bundle.js
  devtool: "eval-source-map"
};
