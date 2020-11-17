const express = require("express");
const appCounters = express();

const countersData = [10, 23, 345, 353, 345, 111]

appCounters.route('/').get((req, res) => {
    res.send(countersData)
})


module.exports = appCounters
