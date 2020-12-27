const express = require("express");
const dataBaseConnector = require("../database/data-base-connector");
const appNasaCounters = express();

async function getNasaCountersData() {
    return await dataBaseConnector.get_table_data_from_db(
        'SELECT * FROM nasa_counters LIMIT 1', false);
}

appNasaCounters.route('/').get(async (req, res) => {
    let nasaCountersData = await getNasaCountersData();
    res.send(nasaCountersData);
})

module.exports = appNasaCounters;
