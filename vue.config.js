const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin')

const isProd = process.env.NODE_ENV === "production";

module.exports = {
  publicPath: '',
  configureWebpack: {
    // Set up all the aliases we use in our app.
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 6
      }),
      new CompressionPlugin(),
    ],
    externals: function (context, request, callback) {
      if (/xlsx|canvg|pdfmake/.test(request)) {
        return callback(null, "commonjs " + request);
      }
      callback();
    }
  },
  pwa: {
    name: 'Vue Argon Dashboard',
    themeColor: '#172b4d',
    msTileColor: '#172b4d',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: '#172b4d'
  },
  css: {
    // Enable CSS source maps.
    sourceMap: process.env.NODE_ENV !== 'production'
  }
};
