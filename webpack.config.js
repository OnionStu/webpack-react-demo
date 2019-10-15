const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');

const isProductionEnv = process.env.NODE_ENV === 'production';

const webpackMode = isProductionEnv ? 'production' : 'development';

var publicUrl = '';

const theme = () => ({
  // 'primary-color': '#09c199',
  // 'info-color': '#09c199',
  // 'link-color': '#09c199',
  // 'border-radius-base': '2px',
  // 'table-header-bg': '#f3f4f6',
  // 'layout-body-background': '#f3f4f6',
  'layout-header-background': '#fff'
  // 'layout-header-height': '54px',
  // 'text-color': '#333f52',
  // 'text-color-secondary': '#8692a6'
});

module.exports = {
  mode: webpackMode,
  entry: './src/index.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.less/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [autoprefixer()]
            }
          },
          { loader: 'less-loader', options: { javascriptEnabled: true, modifyVars: theme() } }
        ]
      },
      {
        test: /\.(jsx?)$/,
        exclude: /(node_modules|bower_components)/,
        enforce: 'pre',
        use: [
          {
            loader: 'eslint-loader'
          }
        ]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules|vendor/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: [
                '@babel/plugin-transform-runtime',
                [
                  'import',
                  {
                    libraryName: 'antd',
                    libraryDirectory: 'es',
                    style: true
                  }
                ]
              ]
            }
          }
        ]
      }
    ]
  },
  devtool: isProductionEnv ? false : 'inline-source-map',
  devServer: {
    contentBase: [path.join(__dirname, 'public')],
    port: 3333, // 端口
    // open: true, // 自动打开浏览器
    overlay: true // 浏览器页面上显示错误,
    // historyApiFallback: true
    // hot: true,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html')
    }),
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, { PUBLIC_URL: publicUrl })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
