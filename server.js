const express = require("express");
/* Node Modules */
const bodyParser = require('body-parser')
const cors = require('cors')
const Joi = require('joi') // do walidacji danych
// const mysql = require('mysql')
const cron = require('node-cron')

/* Subfiles */
const appCats = require("./api/cats")
const appClimateData = require("./api/climate-data")

const GlobalWarmingService = require("./apps/global-warming-service")
const appCounters = require("./api/counters")
const ClimateNasaGovScrapper = require("./apps/climate-nasa-gov-scrapper")


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
const globalWarmingService = new GlobalWarmingService(app)

var cronJob = cron.schedule("*/10 * * * * *", () => {

    globalWarmingService.run()   //commented out to prevent fetching data from API every 10sec
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
    console.log(`Server started on port ${port}!`)
})
