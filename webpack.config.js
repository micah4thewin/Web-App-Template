const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: ['./src/index.js', './src/dom.js'],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'MyAuthLibrary',
    libraryTarget: 'umd'
  },
  devtool: "source-map",
  module: {
    rules: [
      // Rule for processing the Bootstrap icons
      {
        test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/i,
        type: 'asset/resource',
        generator: {
          //filename: 'fonts/[name]-[hash][ext][query]'
          filename: 'fonts/[name][ext][query]'
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        test: /\.m?jsx?$/,
        resolve: {
          fullySpecified: false,
          fallback: {
            "crypto": false
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [{
          loader: 'file-loader',
        }, ],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },

      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.(csv|tsv)$/i,
        use: ['csv-loader'],
      },
      {
        test: /\.xml$/i,
        use: ['xml-loader'],
      },
    ]
  },
  optimization: {
    minimizer: [
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminGenerate,
          options: {
            // Lossless optimization with custom option
            // Feel free to experiment with options for better result for you
            plugins: [
              ["gifsicle", {
                interlaced: true
              }],
              ["jpegtran", {
                progressive: true
              }],
              ["optipng", {
                optimizationLevel: 5
              }],
              // Svgo configuration here https://github.com/svg/svgo#configuration
              [
                "svgo",
                {
                  name: 'preset-default',
                  params: {
                    overrides: {
                      // customize plugin options
                      convertShapeToPath: {
                        convertArcs: true
                      },
                      // disable plugins
                      convertPathData: false
                    }
                  }
                },
              ],
            ],
          },
        },
      }),
    ],
    splitChunks: {
      chunks: 'async',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  devServer: {
    hot: true,
    port: 8090,
    open: true
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: ['*.html']
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      inject: 'body',
      scriptLoading: 'defer',
      favicon: './src/images/logo.png',
      minify: true,
    }),
    new MiniCssExtractPlugin()
  ]
};
