const express = require("express");
/* Node Modules */
const bodyParser = require('body-parser')
const cors = require('cors')
const Joi = require('joi') // do walidacji danych
const mysql = require('mysql')
/* Subfiles */
const appCats = require("./api/cats")
const appClimateData = require("./api/climate-data")
const appCounters = require("./api/counters")
const ApiScrapper = require("./apps/api-scrapper")

const app = express();

var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use("/api/cats", appCats)
app.use("/api/climate-data", appClimateData)
app.use("/api/counters", appCounters)

// Every 10 seconds, visit other websites with climate data
const apiScrapper = new ApiScrapper()
const scrapperIntervalSeconds = 10;
let interval = setInterval(() => { intervalCallback() }, scrapperIntervalSeconds * 1000);
function intervalCallback() {
    // Here you can use own class to get data from other sites
    apiScrapper.scrap()
}
// clearInterval(interval)

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
