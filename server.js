const express = require("express");
/* Node Modules */
const bodyParser = require('body-parser')
const cors = require('cors')
const Joi = require('joi') // do walidacji danych
const fs = require('fs');
const mysql = require('mysql')
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


/* Ponizej example z użycia bazy danych */
// var database_connection = mysql.createConnection({
var database_connection = mysql.createPool({  //Pool jest lepszy, jak sie zamknie polaczenie trzeba tworzyc nowe nie mozna kilku queries na raz itp
    host: 'backend-database.cwatox5ynlgb.eu-central-1.rds.amazonaws.com',
    user: 'admin',
    password: '3edcvfr4', // FIXME: UKRYWANIE HASEL!
    database: 'CLIMATE_DATA',
    // ssl: {
    //     ca: fs.readFileSync(__dirname + '/ssl/rds-ca-2019-eu-central-1.pem')
    // } //FIXME:
})



// Every 10 seconds, visit other websites with climate data
const climateNasaGovScrapper = new ClimateNasaGovScrapper()

climateNasaGovScrapper.run(); // One time run
// Every minute, visit other websites with climate data
const globalWarmingService = new GlobalWarmingService(app, database_connection) //TODO: DODAJ connection

var cronJob = cron.schedule("*/10 * * * * *", () => {

    globalWarmingService.run()   //commented out to prevent fetching data from API every 10sec
    console.info('cron job completed');
});
cronJob.start();

/* Ponizej example z użycia bazy danych */
// var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'inzynierka',
//     database: 'mysql'
// })

// connection.connect()

// connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
//     if (err) throw err

//     console.log('The solution is: ', rows[0].solution)
// })

// connection.end()

// simple route
app.get("/", (req, res) => {
    res.status(200).send(`Hello world`);
});

// set port, listen for requests
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}!`)
})
