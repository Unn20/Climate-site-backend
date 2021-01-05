const express = require("express");
/* Node Modules */
const bodyParser = require('body-parser')
const cors = require('cors')
const Joi = require('joi')
const cron = require('node-cron')
const logger = require('./logger')

/* Subfiles */
const appCats = require("./api/cats")
const appClimateData = require("./api/climate-data")

const GlobalWarmingService = require("./apps/global-warming-service")
const appCounters = require("./api/counters")
const appNasaCounters = require("./api/nasa-counters")
const ClimateNasaGovScrapper = require("./apps/climate-nasa-gov-scrapper")
const CountersScrapper = require("./apps/counters-scrapper")


const app = express();

const corsOptions = {
    origin: ['http://localhost:4200', '52.219.72.224', 'http://climate-site.s3-website.eu-central-1.amazonaws.com'],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use("/api/cats", appCats)
app.use("/api/climate-data", appClimateData)
app.use("/api/counters", appCounters)
app.use("/api/nasa-counters", appNasaCounters)


// Every 10 seconds, visit other websites with climate data
const climateNasaGovScrapper = new ClimateNasaGovScrapper()

climateNasaGovScrapper.run(); // One time run
// Every minute, visit other websites with climate data

const countersScrapper = new CountersScrapper()

countersScrapper.run();

const globalWarmingService = new GlobalWarmingService(app)

globalWarmingService.run()
// var cronJob = cron.schedule("*/1000 * * * * *", () => {
//
//     globalWarmingService.run()
//     console.info('cron job completed');
// });
// cronJob.start();


// simple route
app.get("/", (req, res) => {
    res.status(200).send(`Hello world`);
});

// set port, listen for requests
const port = process.env.PORT || 3000;
app.listen(port, () => {
    logger.info(`Server started on port ${port}!`)
})
