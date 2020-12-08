const express = require("express");
const dataBaseConnector = require("../database/data-base-connector");
const appClimateData = express();

appClimateData.route('/').get((req, res) => {
    res.send("data")
})


function getTemperatureData(){
    dataBaseConnector.get_table_data_from_db('SELECT * FROM temperature', function(rows) {
        return rows
    })
};


function getCarbonDioxideData(){
    dataBaseConnector.get_table_data_from_db('SELECT * FROM carbon_dioxide', function(rows) {
        return rows
    })
};

function getMethaneData(){
    dataBaseConnector.get_table_data_from_db('SELECT * FROM methane', function(rows) {
        return rows
    })
};

function getNitriousOxideData(){
    dataBaseConnector.get_table_data_from_db('SELECT * FROM nitrious_oxide', function(rows) {
        return rows
    })
};

function getArcticData(){
    dataBaseConnector.get_table_data_from_db('SELECT * FROM arctic', function(rows) {
        return rows
    })
};


appClimateData.route('/temperature').get((req, res) => {
    res.send(getTemperatureData())
})

appClimateData.route('/co2').get((req, res) => {
    res.send(getCarbonDioxideData())
})

appClimateData.route('/methane').get((req, res) => {
    res.send(getMethaneData())
})

appClimateData.route('/nitrous-oxide').get((req, res) => {
    res.send(getNitriousOxideData())
})

appClimateData.route('/arctic').get((req, res) => {
    res.send(getArcticData())
})


module.exports = appClimateData;