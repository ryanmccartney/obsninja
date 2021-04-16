//NAME: logger.js
//AUTH: Ryan McCartney <ryan.mccartney@bbc.co.uk>
//DATE: 15/02/2021
//DESC: Main Cuckoo Nest service defined here

const winston = require('winston');
require('winston-daily-rotate-file');
const path = require('path');

const fileTransport = new winston.transports.DailyRotateFile({
  filename: 'logs-%DATE%',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  dirname: path.join(__dirname,'..','..','logs'),
  maxSize: '20m',
  maxFiles: '14d',
  extension: '.log',
  createSymlink: true,
});

const consoleTransport = new winston.transports.Console();

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    winston.format.printf(info => `${info.timestamp}: [${info.level}] ${info.message}`)
  ),
  transports: [
    consoleTransport,
    fileTransport,
  ]
});

module.exports = logger;