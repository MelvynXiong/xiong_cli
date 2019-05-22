const buildProject = async (ctx, args, options, logger) => {
  logger.info('打包构建项目')
}

module.exports = {
  command: 'build',
  description: '打包构建项目',
  args: [],
  options: [],
  handler: buildProject,
}
