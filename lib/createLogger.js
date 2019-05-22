const winston = require('winston')
const dayjs = require('dayjs')
const chalk = require('chalk')

const { createLogger, format, transports } = winston
const { combine, printf } = format

const defaultOpts = {
  timeFormat: 'HH:mm:ss',
  fileTimeFormat: 'YY/MM/DD HH:mm:ss',
  colors: ['black', 'gray', 'white', 'green', 'yellow', 'red'],
  fileTransports: [],
}

const parseColorsOpt = optColors => {
  const { colors } = defaultOpts

  if (optColors && Array.isArray(optColors)) {
    return colors.map((c, i) => optColors[i] || c)
  }

  return colors
}

const consoleFormatter = (colors, timeFormat) =>
  printf(info => {
    const logLevel = info.level.toUpperCase()
    let chalkColor = chalk.gray

    switch (logLevel) {
      case 'SILLY':
        chalkColor = chalk[colors[0]]
        break
      case 'DEBUG':
        chalkColor = chalk[colors[1]]
        break
      case 'VERBOSE':
        chalkColor = chalk[colors[2]]
        break
      case 'INFO':
        chalkColor = chalk[colors[3]]
        break
      case 'WARN':
        chalkColor = chalk[colors[4]]
        break
      case 'ERROR':
        chalkColor = chalk[colors[5]]
        break
      default:
        chalkColor = chalk.gray
    }

    const logTime = dayjs(info.timestamp).format(timeFormat)

    return (
      chalk.gray('[') +
      chalkColor(logLevel.substr(0, 5)) +
      chalk.gray(`] [`) +
      chalk.gray(logTime) +
      chalk.gray('] ') +
      info.message
    )
  })

const fileFormatter = timeFormat =>
  printf(info => {
    return `[${info.level.toUpperCase()}] [${dayjs(info.timestamp).format(
      timeFormat
    )}] ${info.message}`
  })

const getLogger = opts => {
  const timeFormat = (opts && opts.timeFormat) || defaultOpts.timeFormat
  const fileTimeFormat =
    (opts && opts.fileTimeFormat) || defaultOpts.fileTimeFormat
  const colors = (opts && parseColorsOpt(opts.colors)) || defaultOpts.colors
  const fileTransports =
    (opts && opts.fileTransports) || defaultOpts.fileTransports

  const consoleOpt = {
    handleExceptions: true,
    level: 'debug',
    format: combine(consoleFormatter(colors, timeFormat)),
  }

  const transportsArr = [new transports.Console(consoleOpt)]

  for (let i = 0; i < fileTransports.length; i += 1) {
    const fileOpt = {
      format: combine(fileFormatter(fileTimeFormat)),
      ...fileTransports[i],
    }
    transportsArr.push(new transports.File(fileOpt))
  }

  const logger = createLogger({
    transports: transportsArr,
  })

  return logger
}

module.exports = getLogger
