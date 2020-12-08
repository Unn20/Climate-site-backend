/* 
Scrapper getting data from api of this site: https://global-warming.org/ 
To get full details, please visit this site.

Temperature anomalies: https://global-warming.org/api/temperature-api
New data appears every one month. Data is gathered since 1880y.

Carbion dioxide global density: https://global-warming.org/api/co2-api
New data appears every one day. Data is gathered since 2010.01.01.

Methane global density: https://global-warming.org/api/methane-api
New data appears every one month. Data is gathered since 1983.07

Nitrous Oxide global density: https://global-warming.org/api/nitrous-oxide-api
New data appears every one month. Data is gathered since 2001.03

Melted Polar Ice Cap: https://global-warming.org/api/arctic-api
New data appears every one year. Data is gathered since 1979
*/

const http = require('http');
const https = require('https');
const dataBaseConnector = require("../database/data-base-connector");


class GlobalWarmingService {
    metadata = {
        url: "global-warming.org",
        port: 443,
        method: 'GET',
        temperatureAPI: "/api/temperature-api",
        carbionDioxideAPI: "/api/co2-api",
        methaneAPI: "/api/methane-api",
        nitrousOxideAPI: "/api/nitrous-oxide-api",
        meltedIceCapAPI: "/api/arctic-api"
    }
    http = http
    https = https
    options = {
        host: this.metadata.url,
        port: this.metadata.port,
        method: this.metadata.method,
        headers: {
            'Content-Type': 'application/json'
        }
    }

    api_database_mapping = {
        temperature: 'temperature',
        carbonDioxide: 'carbon_dioxide',
        methane: 'methane',
        nitrousOxide: 'nitrious_oxide',
        arctic: 'arctic'
    }

    constructor(app) {
        this.app = app
    }

    // funkcja wywoływana przy każdym zaciągnięciu danych z API
    handleDatabase(resultJson) {
        // console.log(resultJson)
        // Method to change key names in an object
        // resultJson.temperature = resultJson.temperature.map(({ time: year_day, ...rest }) => ({ year_day, ...rest }));
        
        // TODO: !!!! DATA VALIDATION
        dataBaseConnector.save_data_from_apis(resultJson, this.api_database_mapping);
    }

    run() {
        let resultJson = {
            temperature: [],
            carbonDioxide: [],
            methane: [],
            nitrousOxide: [],
            arctic: []
        }

        const promise1 = new Promise((resolve, reject) => {
            this.options.path = this.metadata.temperatureAPI;
            this.getJSON(this.options, (statusCode, result) => {
                if (statusCode === 200) {
                    resolve(result.result)
                } else {
                    reject("Error while fetching data from temperature API")
                }
            });
        }).then((result) => {
            result.forEach((item, index, array) => {
                array[index].year = (array[index].time).split('.')[0]
                array[index].month = Math.floor((parseFloat(array[index].time) - Math.floor(parseFloat(array[index].time))) * 12) + 1
                delete array[index].time
                array[index].station = parseFloat(array[index].station)
                array[index].land = parseFloat(array[index].land)
            })
            resultJson.temperature = result
        }).catch(err => {
            console.log(err)
        })

        const promise2 = new Promise((resolve, reject) => {
            this.options.path = this.metadata.carbionDioxideAPI;
            this.getJSON(this.options, (statusCode, result) => {
                if (statusCode === 200) {
                    resolve(result.co2)
                } else {
                    reject("Error while fetching data from co2 API")
                }
            });
        }).then((result) => {
            result.forEach((item, index, array) => {
                array[index].cycle = parseFloat(array[index].cycle)
                array[index].trend = parseFloat(array[index].trend)
            })
            resultJson.carbonDioxide = result
        }).catch(err => {
            console.log(err)
        })

        const promise3 = new Promise((resolve, reject) => {
            this.options.path = this.metadata.methaneAPI;
            this.getJSON(this.options, (statusCode, result) => {
                if (statusCode === 200) {
                    resolve(result.methane)
                } else {
                    reject("Error while fetching data from methane API")
                }
            });
        }).then((result) => {
            result.forEach((item, index, array) => {
                const oldDate = (array[index].date).split('.')
                delete array[index].date

                array[index].year = oldDate[0]
                array[index].month = oldDate[1]

                array[index].average = parseFloat(array[index].average)
                array[index].trend = parseFloat(array[index].trend)
                array[index].averageUnc = parseFloat(array[index].averageUnc)
                array[index].trendUnc = parseFloat(array[index].trendUnc)
            })
            resultJson.methane = result
        }).catch(err => {
            console.log(err)
        })

        const promise4 = new Promise((resolve, reject) => {
            this.options.path = this.metadata.nitrousOxideAPI;
            this.getJSON(this.options, (statusCode, result) => {
                if (statusCode === 200) {
                    resolve(result.nitrous)
                } else {
                    reject("Error while fetching data from nitrous oxide API")
                }
            });
        }).then((result) => {
            result.forEach((item, index, array) => {
                const oldDate = (array[index].date).split('.')
                delete array[index].date
                array[index].year = oldDate[0]
                array[index].month = oldDate[1]

                array[index].average = parseFloat(array[index].average)
                array[index].trend = parseFloat(array[index].trend)
                array[index].averageUnc = parseFloat(array[index].averageUnc)
                array[index].trendUnc = parseFloat(array[index].trendUnc)
            })
            resultJson.nitrousOxide = result
        }).catch(err => {
            console.log(err)
        })

        const promise5 = new Promise((resolve, reject) => {
            this.options.path = this.metadata.meltedIceCapAPI;
            this.getJSON(this.options, (statusCode, result) => {
                if (statusCode === 200) {
                    resolve(result.result)
                } else {
                    reject("Error while fetching data from arctic API")
                }
            });
        }).then((result) => {
            resultJson.arctic = result
        }).catch(err => {
            console.log(err)
        })

        Promise.all([promise1, promise2, promise3, promise4, promise5]).then((values) => {
            this.handleDatabase(resultJson)
        })
    }


    getJSON(options, onResult) {
        // console.log('rest::getJSON');
        const port = options.port == 443 ? https : http;

        let output = '';

        const req = port.request(options, (res) => {
            // console.log(`${options.host} : ${res.statusCode}`);
            res.setEncoding('utf8');

            res.on('data', (chunk) => {
                output += chunk;
            });
            res.on('end', () => {
                let obj = JSON.parse(output);
                onResult(res.statusCode, obj);
            });
        });
        req.on('error', (err) => {
            console.log(`Error: ${err.message}`)
        });
        req.end();
    };
}

module.exports = GlobalWarmingService;