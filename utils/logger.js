const winston = require("winston");

const addTimestamp = winston.format((info) => {
  info.message = `${new Date().toISOString()} ${info.message}`;
  return info;
});

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: "debug",
      handleExceptions: true,
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
      level: "info",
      handleExceptions: true,
      format: winston.format.combine(
        addTimestamp(),
        winston.format.simple()
      ),
      maxsize: 5120000,
      maxFiles: 5,
      filename: `${__dirname}/../logs/logs-application.log`,
    }),
  ],
});

module.exports = logger;