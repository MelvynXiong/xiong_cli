const path = require('path')
const process = require('process')
const fs = require('fs-extra')
const prog = require('caporal')
const koaCompose = require('koa-compose')
const logger = require('./logger')
// 当前node进程的工作目录
const cwd = process.cwd()

const noop = async () => {}

// 要从顶层注入的变量
const ctx = {
  cwd,
  prog,
}

module.exports = async () => {
  try {
    await koaCompose([
      require('./middlewares/checkNodeVersion'),
      require('./middlewares/mountCmd')
    ])(ctx, noop)
  } catch (err) {
    console.log(err)
  }
}
