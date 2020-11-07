const express = require("express");
const appClimateData = express();

appClimateData.route('/').get((req, res) => {
    res.send("data")
})


module.exports = appClimateData