var path    = require("path");
var webpack = require("webpack");

module.exports = {
  cache: true,
  entry: {
    "VaangoUI": "./src/VaangoUI.js"
  },
  output: {
    path: path.join(__dirname, "/assets/"),
    publicPath: "assets/",
    filename: "[name].js",
    chunkFilename: "[hash].js",
    library: ["[name]"],
    libraryTarget: "umd"
  },
  module: {
    loaders: [
      {test: /\.css$/, loader: "css-loader"},
      {test: /\.html$/, loader: "html-loader"},
      {test: /\.jpg$/, loader: "url-loader"},
      {
       test: /\.js$/,
        include: [/node_modules(\/|\\)vtk\.js(\/|\\)/],
        loader: "babel-loader",
        query: {
          presets: ['es2015']
        }
      }, 
      {
       test: /\.js$/,
       exclude: /node_modules/,
       loader: "babel-loader",
       query: {
         presets: ['es2015']
       }
      },
      {
        test: /\.glsl$/i,
        loader: 'shader-loader',
      },
      {
        test: /\.mcss$/,
        loader: 'style!css?modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:5]!postcss',
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      }
    ]
  },
  externals: {
    "jquery": "jQuery",
  },
  resolve: {
    alias: {
      'vtk.js': path.resolve('./node_modules/vtk.js'),
      'vkbeautify': path.resolve('./node_modules/vkbeautify'),
    },
  },
  plugins: []
};
