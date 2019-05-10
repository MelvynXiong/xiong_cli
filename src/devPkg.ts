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
export const webpackPkg = [
  'webpack',
  'webpack-cli',
  'webpack-merge',
  ...pluginPkg,
  ...loaderPkg,
]
// 测试工具包
export const testPkg = ['jest', 'ts-jest']
export const tsPkg = [...typesPkg, ...lintPkg, 'typescript']
export const serverPkg = [
  'express',
  'open',
  'nodemon',
  'webpack-dev-middleware',
  'webpack-hot-middleware',
]
export default [...webpackPkg, ...tsPkg, ...serverPkg, ...testPkg]
