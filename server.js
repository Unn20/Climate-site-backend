const express = require("express");
/* Node Modules */
const bodyParser = require('body-parser')
const cors = require('cors')
const Joi = require('joi')
const cron = require('node-cron')
const winston = require('winston');

/* Subfiles */
const appCats = require("./api/cats")
const appClimateData = require("./api/climate-data")

const GlobalWarmingService = require("./apps/global-warming-service")
const appCounters = require("./api/counters")
const ClimateNasaGovScrapper = require("./apps/climate-nasa-gov-scrapper")
const CountersScrapper = require("./apps/counters-scrapper")
const databaseTransport = require("./database/data-base-logger-transport")
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
                //   port: process.env.MYSQL_PORT,
                user: 'admin',
                password: '3edcvfr4',
                database: 'CLIMATE_DATA'
            },
            name: 'MySQL',
            pool: {
                min: 0,
                max: 10
            },
            tableName: 'logs'
        })
        // new databaseTransport({
        //     host: 'backend-database.cwatox5ynlgb.eu-central-1.rds.amazonaws.com',
        //     user: 'admin',
        //     password: '3edcvfr4',
        //     database: 'CLIMATE_DATA'
        // })
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
        )
    }));
}


const app = express();

const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use("/api/cats", appCats)
app.use("/api/climate-data", appClimateData)
app.use("/api/counters", appCounters)


// Every 10 seconds, visit other websites with climate data
const climateNasaGovScrapper = new ClimateNasaGovScrapper()

climateNasaGovScrapper.run(); // One time run
// Every minute, visit other websites with climate data


const countersScrapper = new CountersScrapper()


const globalWarmingService = new GlobalWarmingService(app)

globalWarmingService.run()
var cronJob = cron.schedule("01 * * * *", () => {
    globalWarmingService.run()
    countersScrapper.run();
    console.info('cron job completed');
});
cronJob.start();


// simple route
app.get("/", (req, res) => {
    res.status(200).send(`Hello world`);
});

// set port, listen for requests
const port = process.env.PORT || 3000;
app.listen(port, () => {
    logger.info(`Server started on port ${port}!`)
})
