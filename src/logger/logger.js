const winston = require('winston')

const config = {
  levels: {
    inform: 0,
    error: 1,
    warning: 2,
    custom: 3
  },
  colors: {
    inform: 'green',
    error: 'red',
    warning: 'yellow',
    custom: 'white'
  }
}

winston.addColors(config.colors)

const logger = module.exports = winston.createLogger({
  levels: config.levels,
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.Console()
  ],
  level: 'custom'
})

module.exports = logger
