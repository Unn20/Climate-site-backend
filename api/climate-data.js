const express = require("express");
const dataBaseConnector = require("../database/data-base-connector");
const appClimateData = express();


appClimateData.route('/').get((req, res) => {
    res.send("data")
})


async function getTemperatureData(){
    const temperature_data = await dataBaseConnector.get_table_data_from_db('SELECT * FROM temperature');
    return temperature_data;
};


async function getCarbonDioxideData(){
    const carbon_dioxide_data = await dataBaseConnector.get_table_data_from_db('SELECT * FROM carbon_dioxide');
    return carbon_dioxide_data;
};

async function getMethaneData(){
    const methane_data = await dataBaseConnector.get_table_data_from_db('SELECT * FROM methane');
    return methane_data;
};

async function getNitrousOxideData(){
    const nitrous_data = await dataBaseConnector.get_table_data_from_db('SELECT * FROM nitrous_oxide');
    return nitrous_data;
};

async function getArcticData(){
    const arctic_data = await dataBaseConnector.get_table_data_from_db('SELECT * FROM arctic');
    return arctic_data;
};


appClimateData.route('/temperature').get(async (req, res) => {
    let temperature_data = await getTemperatureData()
    res.send(temperature_data);
})

appClimateData.route('/co2').get(async (req, res) => {
    let carbon_dioxide_data = await getCarbonDioxideData()
    res.send(carbon_dioxide_data)
})

appClimateData.route('/methane').get(async (req, res) => {
    let methane_data = await getMethaneData()
    res.send(methane_data)
})

appClimateData.route('/nitrous-oxide').get(async (req, res) => {
    let nitrous_oxide_data = await getNitrousOxideData()
    res.send(nitrous_oxide_data)
})

appClimateData.route('/arctic').get(async (req, res) => {
    let arctic_data = await getArcticData()
    res.send(arctic_data)
})


module.exports = appClimateData;