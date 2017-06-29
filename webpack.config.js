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
      {test: /\.vue$/, loader: "vue"},
      {test: /\.ts$/, loader: "babel-loader!vue-ts"},
      {test: /\.css$/, loader: "css-loader"},
      {test: /\.html$/, loader: "html-loader"},
      {test: /\.jpg$/, loader: "url-loader"},
      {
       test: /\.js$/,
        include: [/node_modules(\/|\\)vtk\.js(\/|\\)/,
                  /node_modules(\/|\\)vue-material(\/|\\)/],
        loader: `babel?presets[]=es2015`,
      }, 
      {
       test: /\.js$/,
       exclude: /node_modules/,
       loader: `babel?presets[]=es2015`,
      },
      {
        test: /\.glsl$/i,
        loader: 'shader',
      },
      {
        test: /\.mcss$/,
        loader: 'style!css?modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:5]!postcss',
      }
    ]
  },
  vue: {
    // instruct vue-loader to load TypeScript
    loaders: { js: 'vue-ts-loader', },
    // make TS' generated code cooperate with vue-loader
    esModule: true
  },
  externals: {
    "jquery": "jQuery",
    //"three": "THREE",
    //"three-trackballcontrols": "THREE.TrackballControls",
    //"vtk.js": "vtk.js",
  },
  resolve: {
    alias: {
      // Bind version of jquery
      //"lodash": "libs/lodash",
      'vtk.js': path.resolve('./node_modules/vtk.js'),
      'vkbeautify': path.resolve('./node_modules/vkbeautify'),
    },
    extensions: ['', '.vue', '.ts', '.js']//,
    //root: path.join(__dirname, "src/scripts/")
  },
  plugins: []
};
