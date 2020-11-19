const express = require("express");
const appClimateData = express();

appClimateData.route('/').get((req, res) => {
    res.send("data")
})

temperatureFakeData = {
    "temperature": [
        { "time": "2015.88", "station": "1.27", "land": "1.05" }, { "time": "2015.96", "station": "1.47", "land": "1.15" },
        { "time": "2016.04", "station": "1.35", "land": "1.17" }, { "time": "2016.13", "station": "1.69", "land": "1.36" },
        { "time": "2016.21", "station": "1.69", "land": "1.35" }, { "time": "2016.29", "station": "1.40", "land": "1.11" },
        { "time": "2016.38", "station": "1.26", "land": "0.95" }, { "time": "2016.46", "station": "0.98", "land": "0.80" },
        { "time": "2016.54", "station": "1.04", "land": "0.85" }, { "time": "2016.63", "station": "1.36", "land": "1.01" },
        { "time": "2016.71", "station": "1.20", "land": "0.90" }, { "time": "2016.79", "station": "1.22", "land": "0.88" },
        { "time": "2016.88", "station": "1.28", "land": "0.90" }, { "time": "2016.96", "station": "1.21", "land": "0.86" },
        { "time": "2017.04", "station": "1.24", "land": "1.02" }, { "time": "2017.13", "station": "1.47", "land": "1.14" },
        { "time": "2017.21", "station": "1.44", "land": "1.17" }, { "time": "2017.29", "station": "1.18", "land": "0.95" },
        { "time": "2017.38", "station": "1.25", "land": "0.91" }, { "time": "2017.46", "station": "0.85", "land": "0.72" },
        { "time": "2017.54", "station": "1.08", "land": "0.81" }, { "time": "2017.63", "station": "1.12", "land": "0.87" },
        { "time": "2017.71", "station": "1.04", "land": "0.77" }, { "time": "2017.79", "station": "1.22", "land": "0.90" },
        { "time": "2017.88", "station": "1.13", "land": "0.88" }, { "time": "2017.96", "station": "1.24", "land": "0.94" },
        { "time": "2018.04", "station": "1.14", "land": "0.81" }, { "time": "2018.13", "station": "1.16", "land": "0.85" },
        { "time": "2018.21", "station": "1.19", "land": "0.89" }, { "time": "2018.29", "station": "1.24", "land": "0.89" },
        { "time": "2018.38", "station": "1.04", "land": "0.83" }, { "time": "2018.46", "station": "0.99", "land": "0.78" },
        { "time": "2018.54", "station": "1.18", "land": "0.83" }, { "time": "2018.63", "station": "1.01", "land": "0.76" },
        { "time": "2018.71", "station": "1.03", "land": "0.80" }, { "time": "2018.79", "station": "1.21", "land": "1.02" },
        { "time": "2018.88", "station": "1.06", "land": "0.83" }, { "time": "2018.96", "station": "1.26", "land": "0.91" },
        { "time": "2019.04", "station": "1.23", "land": "0.93" }, { "time": "2019.13", "station": "1.25", "land": "0.95" },
        { "time": "2019.21", "station": "1.45", "land": "1.18" }, { "time": "2019.29", "station": "1.31", "land": "1.02" },
        { "time": "2019.38", "station": "1.13", "land": "0.86" }, { "time": "2019.46", "station": "1.15", "land": "0.92" },
        { "time": "2019.54", "station": "1.20", "land": "0.94" }, { "time": "2019.63", "station": "1.14", "land": "0.94" },
        { "time": "2019.71", "station": "1.12", "land": "0.93" }, { "time": "2019.79", "station": "1.27", "land": "1.01" },
        { "time": "2019.88", "station": "1.32", "land": "1.00" }, { "time": "2019.96", "station": "1.48", "land": "1.10" },
        { "time": "2020.04", "station": "1.48", "land": "1.17" }, { "time": "2020.13", "station": "1.62", "land": "1.25" },
        { "time": "2020.21", "station": "1.43", "land": "1.18" }, { "time": "2020.29", "station": "1.44", "land": "1.13" },
        { "time": "2020.38", "station": "1.30", "land": "1.02" }, { "time": "2020.46", "station": "1.24", "land": "0.92" },
        { "time": "2020.54", "station": "1.07", "land": "0.90" }, { "time": "2020.63", "station": "1.05", "land": "0.87" },
        { "time": "2020.71", "station": "1.33", "land": "0.99" }, { "time": "2020.79", "station": "1.21", "land": "0.90" }]
}

co2FakeData = {
    "co2": [
        { "year": "2020", "month": "10", "day": "31", "cycle": "412.73", "trend": "413.39" },
        { "year": "2020", "month": "11", "day": "1", "cycle": "412.79", "trend": "413.40" },
        { "year": "2020", "month": "11", "day": "2", "cycle": "412.85", "trend": "413.40" },
        { "year": "2020", "month": "11", "day": "3", "cycle": "412.90", "trend": "413.41" },
        { "year": "2020", "month": "11", "day": "4", "cycle": "412.95", "trend": "413.42" },
        { "year": "2020", "month": "11", "day": "5", "cycle": "413.00", "trend": "413.42" },
        { "year": "2020", "month": "11", "day": "6", "cycle": "413.05", "trend": "413.43" },
        { "year": "2020", "month": "11", "day": "7", "cycle": "413.10", "trend": "413.44" },
        { "year": "2020", "month": "11", "day": "8", "cycle": "413.15", "trend": "413.44" },
        { "year": "2020", "month": "11", "day": "9", "cycle": "413.20", "trend": "413.45" },
        { "year": "2020", "month": "11", "day": "10", "cycle": "413.25", "trend": "413.46" },
        { "year": "2020", "month": "11", "day": "11", "cycle": "413.30", "trend": "413.47" },
        { "year": "2020", "month": "11", "day": "12", "cycle": "413.34", "trend": "413.47" },
        { "year": "2020", "month": "11", "day": "13", "cycle": "413.39", "trend": "413.48" },
        { "year": "2020", "month": "11", "day": "14", "cycle": "413.43", "trend": "413.49" },
        { "year": "2020", "month": "11", "day": "15", "cycle": "413.47", "trend": "413.49" },
        { "year": "2020", "month": "11", "day": "16", "cycle": "413.52", "trend": "413.50" },
        { "year": "2020", "month": "11", "day": "17", "cycle": "413.56", "trend": "413.51" },
        { "year": "2020", "month": "11", "day": "18", "cycle": "413.60", "trend": "413.51" }]
}

methaneFakeData = {
    "methane": [
        { "date": "2018.11", "average": "1866.2", "trend": "1860.8", "averageUnc": "1.1", "trendUnc": "0.8" },
        { "date": "2018.12", "average": "1865.9", "trend": "1861.5", "averageUnc": "1.0", "trendUnc": "0.7" },
        { "date": "2019.1", "average": "1865.0", "trend": "1862.2", "averageUnc": "1.1", "trendUnc": "0.7" },
        { "date": "2019.2", "average": "1865.0", "trend": "1862.9", "averageUnc": "0.9", "trendUnc": "0.7" },
        { "date": "2019.3", "average": "1866.2", "trend": "1863.5", "averageUnc": "0.9", "trendUnc": "0.7" },
        { "date": "2019.4", "average": "1865.3", "trend": "1864.2", "averageUnc": "0.6", "trendUnc": "0.7" },
        { "date": "2019.5", "average": "1861.9", "trend": "1864.9", "averageUnc": "1.2", "trendUnc": "0.6" },
        { "date": "2019.6", "average": "1858.8", "trend": "1865.7", "averageUnc": "1.3", "trendUnc": "0.6" },
        { "date": "2019.7", "average": "1858.4", "trend": "1866.4", "averageUnc": "1.4", "trendUnc": "0.6" },
        { "date": "2019.8", "average": "1862.9", "trend": "1867.3", "averageUnc": "1.4", "trendUnc": "0.6" },
        { "date": "2019.9", "average": "1870.7", "trend": "1868.2", "averageUnc": "1.2", "trendUnc": "0.6" },
        { "date": "2019.10", "average": "1875.4", "trend": "1869.2", "averageUnc": "1.1", "trendUnc": "0.6" },
        { "date": "2019.11", "average": "1875.5", "trend": "1870.3", "averageUnc": "1.0", "trendUnc": "0.7" },
        { "date": "2019.12", "average": "1874.6", "trend": "1871.4", "averageUnc": "0.7", "trendUnc": "0.7" },
        { "date": "2020.1", "average": "1873.2", "trend": "1872.6", "averageUnc": "0.7", "trendUnc": "0.7" },
        { "date": "2020.2", "average": "1872.9", "trend": "1873.8", "averageUnc": "-9.9", "trendUnc": "-9.9" },
        { "date": "2020.3", "average": "1875.1", "trend": "1875.1", "averageUnc": "-9.9", "trendUnc": "-9.9" },
        { "date": "2020.4", "average": "1876.4", "trend": "1876.4", "averageUnc": "-9.9", "trendUnc": "-9.9" },
        { "date": "2020.5", "average": "1874.6", "trend": "1877.6", "averageUnc": "-9.9", "trendUnc": "-9.9" },
        { "date": "2020.6", "average": "1872.1", "trend": "1878.9", "averageUnc": "-9.9", "trendUnc": "-9.9" },
        { "date": "2020.7", "average": "1872.0", "trend": "1880.1", "averageUnc": "-9.9", "trendUnc": "-9.9" }]
}

nitrousOxideFakeData = {
    "nitrous": [
        { "date": "2018.11", "average": "331.5", "trend": "331.3", "averageUnc": "0.2", "trendUnc": "0.2" },
        { "date": "2018.12", "average": "331.7", "trend": "331.4", "averageUnc": "0.2", "trendUnc": "0.2" },
        { "date": "2019.1", "average": "331.8", "trend": "331.5", "averageUnc": "0.2", "trendUnc": "0.2" },
        { "date": "2019.2", "average": "331.7", "trend": "331.6", "averageUnc": "0.2", "trendUnc": "0.2" },
        { "date": "2019.3", "average": "331.7", "trend": "331.6", "averageUnc": "0.2", "trendUnc": "0.2" },
        { "date": "2019.4", "average": "331.6", "trend": "331.7", "averageUnc": "0.2", "trendUnc": "0.2" },
        { "date": "2019.5", "average": "331.6", "trend": "331.8", "averageUnc": "0.2", "trendUnc": "0.2" },
        { "date": "2019.6", "average": "331.7", "trend": "331.8", "averageUnc": "0.2", "trendUnc": "0.2" },
        { "date": "2019.7", "average": "331.9", "trend": "331.9", "averageUnc": "0.2", "trendUnc": "0.2" },
        { "date": "2019.8", "average": "331.9", "trend": "332.0", "averageUnc": "0.2", "trendUnc": "0.2" },
        { "date": "2019.9", "average": "331.9", "trend": "332.1", "averageUnc": "0.2", "trendUnc": "0.2" },
        { "date": "2019.10", "average": "332.1", "trend": "332.1", "averageUnc": "0.2", "trendUnc": "0.2" },
        { "date": "2019.11", "average": "332.3", "trend": "332.2", "averageUnc": "0.2", "trendUnc": "0.2" },
        { "date": "2019.12", "average": "332.4", "trend": "332.3", "averageUnc": "0.2", "trendUnc": "0.2" },
        { "date": "2020.1", "average": "332.5", "trend": "332.4", "averageUnc": "0.2", "trendUnc": "0.2" },
        { "date": "2020.2", "average": "332.6", "trend": "332.6", "averageUnc": "-9.9", "trendUnc": "-9.9" },
        { "date": "2020.3", "average": "332.6", "trend": "332.7", "averageUnc": "-9.9", "trendUnc": "-9.9" },
        { "date": "2020.4", "average": "332.7", "trend": "332.8", "averageUnc": "-9.9", "trendUnc": "-9.9" },
        { "date": "2020.5", "average": "332.8", "trend": "332.9", "averageUnc": "-9.9", "trendUnc": "-9.9" },
        { "date": "2020.6", "average": "332.9", "trend": "333.1", "averageUnc": "-9.9", "trendUnc": "-9.9" },
        { "date": "2020.7", "average": "333.1", "trend": "333.2", "averageUnc": "-9.9", "trendUnc": "-9.9" }]
}

arcticFakeData = {
    "result": [
        { "year": "1979", "extent": 7.05, "area": 4.58 }, { "year": "1980", "extent": 7.67, "area": 4.87 },
        { "year": "1981", "extent": 7.14, "area": 4.44 }, { "year": "1982", "extent": 7.3, "area": 4.43 },
        { "year": "1983", "extent": 7.39, "area": 4.7 }, { "year": "1984", "extent": 6.81, "area": 4.11 },
        { "year": "1985", "extent": 6.7, "area": 4.23 }, { "year": "1986", "extent": 7.41, "area": 4.72 },
        { "year": "1987", "extent": 7.28, "area": 5.64 }, { "year": "1988", "extent": 7.37, "area": 5.36 },
        { "year": "1989", "extent": 7.01, "area": 4.86 }, { "year": "1990", "extent": 6.14, "area": 4.55 },
        { "year": "1991", "extent": 6.47, "area": 4.51 }, { "year": "1992", "extent": 7.47, "area": 5.43 },
        { "year": "1993", "extent": 6.4, "area": 4.58 }, { "year": "1994", "extent": 7.14, "area": 5.13 },
        { "year": "1995", "extent": 6.08, "area": 4.43 }, { "year": "1996", "extent": 7.58, "area": 5.62 },
        { "year": "1997", "extent": 6.69, "area": 4.89 }, { "year": "1998", "extent": 6.54, "area": 4.3 },
        { "year": "1999", "extent": 6.12, "area": 4.29 }, { "year": "2000", "extent": 6.25, "area": 4.35 },
        { "year": "2001", "extent": 6.73, "area": 4.59 }, { "year": "2002", "extent": 5.83, "area": 4.03 },
        { "year": "2003", "extent": 6.12, "area": 4.05 }, { "year": "2004", "extent": 5.98, "area": 4.39 },
        { "year": "2005", "extent": 5.5, "area": 4.07 }, { "year": "2006", "extent": 5.86, "area": 4.01 },
        { "year": "2007", "extent": 4.27, "area": 2.82 }, { "year": "2008", "extent": 4.69, "area": 3.26 },
        { "year": "2009", "extent": 5.26, "area": 3.76 }, { "year": "2010", "extent": 4.87, "area": 3.34 },
        { "year": "2011", "extent": 4.56, "area": 3.21 }, { "year": "2012", "extent": 3.57, "area": 2.41 },
        { "year": "2013", "extent": 5.21, "area": 3.78 }, { "year": "2014", "extent": 5.22, "area": 3.74 },
        { "year": "2015", "extent": 4.62, "area": 3.42 }, { "year": "2016", "extent": 4.53, "area": 2.91 },
        { "year": "2017", "extent": 4.82, "area": 3.35 }, { "year": "2018", "extent": 4.79, "area": 3.35 },
        { "year": "2019", "extent": 4.32, "area": 3.13 }]
}

appClimateData.route('/temperature').get((req, res) => {
    res.send(temperatureFakeData)
})

appClimateData.route('/co2').get((req, res) => {
    res.send(co2FakeData)
})

appClimateData.route('/methane').get((req, res) => {
    res.send(methaneFakeData)
})

appClimateData.route('/nitrous-oxide').get((req, res) => {
    res.send(nitrousOxideFakeData)
})

appClimateData.route('/arctic').get((req, res) => {
    res.send(arcticFakeData)
})


module.exports = appClimateData