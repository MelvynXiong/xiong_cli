const runProject = async (ctx, args, options, logger) => {
  logger.info('启动开发环境')
}

module.exports = {
  command: 'dev',
  description: '启动开发环境',
  args: [],
  options: [],
  handler: runProject,
}
