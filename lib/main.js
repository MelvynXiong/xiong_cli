const process = require('process')
const fs = require('fs-extra')
const path = require('path')
const prog = require('caporal')
const koaCompose = require('koa-compose')
const createLogger = require('./createLogger')

// 创建一个logger
const logger = createLogger()

// 当前node进程的工作目录
const cwd = process.cwd()

// 当前目录下是否存在package.json文件表示当前目录是否初始化
const isInit = fs.existsSync(path.join(cwd, 'package.json'))

// 该命令行工具的目录
const toolRoot = path.resolve(__dirname, '..')

const noop = async () => {}

// 要从顶层注入的变量
const ctx = {
  cwd,
  isInit,
  prog,
  logger,
  toolRoot,
}

module.exports = async () => {
  try {
    await koaCompose([
      require('./middlewares/checkNodeVersion'),
      require('./middlewares/mountCmd'),
    ])(ctx, noop)
    prog.parse(process.argv)
  } catch (err) {
    logger.error(err.stack)
  }
}
