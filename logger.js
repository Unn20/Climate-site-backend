const winston = require('winston');
const { SQLTransport } = require('./database/winston-sql-tranport')

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
                host: 'backend-database.cwatox5ynlgb.eu-central-1.rds.amazonaws.com',
                user: 'admin',
                password: '3edcvfr4',
                database: 'CLIMATE_DATA'
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

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        ),
        level: 'debug'
    }));
}

module.exports = logger;
