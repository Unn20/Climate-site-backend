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

const http = require('http')
const https = require('https')

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

    constructor(app) {
        this.app = app
    }

    getData() {
        this.scrapTemperature()
    }

    scrapTemperature() {
        const options = {
            host: this.metadata.url,
            port: this.metadata.port,
            path: this.metadata.temperatureAPI,
            method: this.metadata.method,
            headers: {
                'Content-Type': 'application/json'
            }
        };
        this.getJSON(options, (statusCode, result) => {
            // Process JSON here
            console.log(`onResult: (${statusCode})\n\n${JSON.stringify(result)}`);

            if (statusCode === 200) {
                console.log("Get data")
            }
        });
    }

    getJSON = (options, onResult) => {
        console.log('rest::getJSON');
        const port = options.port == 443 ? https : http;

        let output = '';

        const req = port.request(options, (res) => {
            console.log(`${options.host} : ${res.statusCode}`);
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