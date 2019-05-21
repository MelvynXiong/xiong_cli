// ts类型声明文件包
const typesPkg = [
  '@types/react',
  '@types/react-router',
  '@types/node',
  '@types/jest',
]
// 代码风格检查工具包
const lintPkg = ['prettier', 'tslint', 'tslint-config-prettier']
// webpack 插件和loader
const pluginPkg = ['html-webpack-plugin']
const loaderPkg = ['ts-loader', 'css-loader', 'style-loader']
const webpackPkg = [
  'webpack',
  'webpack-cli',
  'webpack-merge',
  ...pluginPkg,
  ...loaderPkg,
]
// 测试工具包
const testPkg = ['jest', 'ts-jest']
const tsPkg = [...typesPkg, ...lintPkg, 'typescript']
const serverPkg = [
  'express',
  'open',
  'nodemon',
  'webpack-dev-middleware',
  'webpack-hot-middleware',
]
module.exports = [...webpackPkg, ...tsPkg, ...serverPkg, ...testPkg]
