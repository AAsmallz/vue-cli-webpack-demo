const join = require("path").join;

module.exports = {
  mode: "production",
  entry: join(__dirname, "/src/main.js"), //所有js文件入口
  output: {
    path: join(__dirname, "/dist"), //打包出口文件名+路径
    filename: "./[name].js", //[name] 默认取值index
  },
  plugins: [
    /** 
     * vue-loader vue单文件组件的加载器
     * - 需要配置这个vue-loader.VueLoaderPlugin 是在vue-loader@15.x
     * - 如果是15.x以下版本则不需要配置该插件(vue-loader.VueLoaderPlugin)，以及module.rules下的{ test: /\.vue$/, use: ["vue-loader"] }
     */
    new (require("vue-loader").VueLoaderPlugin)(),
    /**
     * html-webpack-plugin 
     * - 参考 https://webpack.js.org/plugins/html-webpack-plugin/#root
     * - 作用：1. 打包文件中自动生成index.html 2. 将其它插件包以脚本方式写入index.html的body内
     * - filename 选项指html文件名+路径
     * - template 选项指开发项目中的index.html文件入口,有的在src/, 有的在public/
     */
    new (require("html-webpack-plugin"))({
      template: join(__dirname, "/public/index.html"),
      filename: "./index.html",
    }),
  ],
  module: {
    rules: [
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      { test: /\.vue$/, use: ["vue-loader"] },
      {
        test: /\.png$/,
        type: "asset",
        generator: { filename: "./image/[hash].[ext]" },
        parser: {
          dataUrlCondition: { maxSize: 1024 * 1024 },
        },
      },
    ],
  },
};
