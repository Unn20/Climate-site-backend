const winston = require('winston');
const { SQLTransport } = require('./database/winston-sql-transport')
require('dotenv').config()

/* Logger */
const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({
            filename: "error.log",
            level: "error"
        }),
        new SQLTransport({
            client: 'mysql',
            connection: {
                host: process.env.DB_HOST,
                user: process.env.DB_USER_ADMIN_NAME,
                password: process.env.DB_USER_ADMIN_PASSWORD,
                database: process.env.DB_NAME
            },
            name: 'MySQL',
            pool: {
                min: 0,
                max: 10
            },
            tableName: 'logs',
            level: 'info'
        })
    ],
    exceptionHandlers: [
        new winston.transports.File({ filename: 'exceptions.log' })
    ],
    rejectionHandlers: [
        new winston.transports.File({ filename: 'rejections.log' })
    ]
});

if (process.env.ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        ),
        level: 'debug'
    }));
}

module.exports = logger;
