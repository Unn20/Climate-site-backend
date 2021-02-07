/* Express JS app */
const express = require("express");
const app = express();

/* Node Modules */
const bodyParser = require('body-parser')
const cron = require('node-cron')
require('dotenv').config()
const cors = require('cors')

const corsOptions = {
    origin: ['http://localhost:4200', '52.219.72.224', 'http://climate-site.s3-website.eu-central-1.amazonaws.com'],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

/* Subfiles */
const logger = require('./logger')

const GlobalWarmingService = require("./apps/global-warming-service")
const ClimateNasaGovScrapper = require("./apps/climate-nasa-gov-scrapper")
const CountersScrapper = require("./apps/counters-scrapper")

const appCounters = require("./api/counters")
const appNasaCounters = require("./api/nasa-counters")
const appClimateData = require("./api/climate-data")

/* API routing */
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use("/api/climate-data", appClimateData)
app.use("/api/counters", appCounters)
app.use("/api/nasa-counters", appNasaCounters)

const climateNasaGovScrapper = new ClimateNasaGovScrapper()
logger.debug("climateNasaGovScrapper running..");
try {
    climateNasaGovScrapper.run();
} catch (err) {
    logger.error(`An error occured while using climateNasaGovScrapper! err = ${err}`)
}

const countersScrapper = new CountersScrapper()
logger.debug("countersScrapper running..");
try {
    countersScrapper.run();
} catch (err) {
    logger.error(`An error occured while using countersScrapper! err = ${err}`)
}

const globalWarmingService = new GlobalWarmingService(app)
logger.debug("globalWarmingService running..");
try {
    globalWarmingService.run()
} catch (err) {
    logger.error(`An error occured while using globalWarmingService! err = ${err}`)
}

// Run once at 2AM
var cronJob = cron.schedule("0 2 * * *", () => {
    logger.debug("globalWarmingService running..");
    try {
        globalWarmingService.run()
    } catch (err) {
        logger.error(`An error occured while using globalWarmingService! err = ${err}`)
    }
    logger.debug("countersScrapper running..");
    try {
        countersScrapper.run();
    } catch (err) {
        logger.error(`An error occured while using countersScrapper! err = ${err}`)
    }
    logger.debug("climateNasaGovScrapper running..");
    try {
        climateNasaGovScrapper.run();
    } catch (err) {
        logger.error(`An error occured while using climateNasaGovScrapper! err = ${err}`)
    }
});
cronJob.start();

// Set port, listen for requests
const port = process.env.SERVER_PORT;
app.listen(port, () => {
    logger.info(`Server started on port ${port}!`)
})
