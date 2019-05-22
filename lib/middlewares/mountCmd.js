/**
 * mount commands
 */
const path = require('path')

module.exports = async (ctx, next) => {
  const { prog, logger, toolRoot } = ctx

  const version = require(path.join(toolRoot, 'package.json')).version
  // 从插件里加载到的命令集
  const cmds = require(path.join(toolRoot, './plugins'))

  prog
    .version(version)
    .description('xiong FE Tool')
    .logger(logger)

  cmds.forEach(cmd => {
    const { command, description, args, options, handler } = cmd
    let p = prog.command(command, description)
    args.forEach(arg => {
      const { argument, description, validator, defaultValue } = arg
      p.argument(argument, description, validator, defaultValue)
    })
    options.forEach(opt => {
      const { option, description, validator, defaultValue } = opt
      p.option(option, description, validator, defaultValue)
    })

    p.action(async (args, options, logger) => {
      try {
        await handler(ctx, args, options, logger)
      } catch (err) {
        logger.error(err.stack)
      }
    })
  })

  await next()
}
