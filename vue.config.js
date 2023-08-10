const { defineConfig } = require('@vue/cli-service')

// vant
const { VantResolver } = require('unplugin-vue-components/resolvers')
const ComponentsPlugin = require('unplugin-vue-components/webpack')

// 打包结果分析工具
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = defineConfig({
  publicPath: './',
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      // vant 配置插件
      ComponentsPlugin({
        resolvers: [VantResolver()]
      }),
      // 添加打包结果分析工具
      new BundleAnalyzerPlugin()
    ]
  }
})
