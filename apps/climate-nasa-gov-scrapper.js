const urllib = require('urllib');
const cheerio = require('cheerio');
const logger = require('../logger');
const dataBaseConnector = require("../database/data-base-connector");

class ClimateNasaGovScrapper {
    url = 'https://climate.nasa.gov/';

    constructor() {
    }

    fill_database(scrapped) {
        dataBaseConnector.save_data_from_nasa_counters(scrapped);
    }

    run() {
        urllib.request(this.url, (err, data, res) => {
            try {
                if (err) {
                    throw err;
                }
            } catch (error) {
                logger.error(error);
            }

            if (res.statusCode === 200) {
                this.scrap(data);
            } else {
                logger.error("Request failed: " + res.statusCode.toString() + "\n" + res.statusMessage);
            }
        });
    }

    scrap(html) {
        logger.info('Scrapper doing his thing');

        const $ = cheerio.load(html.toString());

        // Find divs with class readout
        const counters = $('div.readout');

        // Extract titles from html
        let titles = $('div.title', counters);
        let titleList = [];
        // For each found div with class title
        titles.each((i, title) => {
            // Remove newline at the beginning and end of string
            let slicedTitle = $(title).text().slice(1, -1);

            // Don't insert duplicates
            let exists = false;
            titleList.forEach(value => {
                if (value === slicedTitle) {
                    exists = true;
                }
            })
            if (!exists)
                titleList.push(slicedTitle);
        })

        // Extract direction of change from html
        let directions = $('div.rate_of_change div.value', counters);
        let directionList = [];
        // For each found div with class value
        directions.each((i, element) => {
            // this div has always two classes first is either up or down, second is value
            let direction = $(element).attr('class').split(' ')[0];
            directionList.push(direction);
        })


        // Extract change number from html
        let values = $('div.change_number', 'div.rate_of_change', counters);
        let valueList = [];
        // For each found div with class change_number
        values.each((i, value) => {
            // Remove newline at the beginning and end of string
            let slicedValue = $(value).text().slice(1, -1);
            valueList.push(slicedValue);
        })

        // Extract units from html
        let units = $('div.units', 'div.rate_of_change', counters);
        const unitList = [];
        // For each found div with class unit
        units.each((i, unit) => {
            // Remove newline at the beginning and end of string
            let slicedUnit = $(unit).text().slice(1, -1);
            unitList.push(slicedUnit);
        })

        // Zip scrapped data together
        const scrapped = [];
        for (let i = 0; i < titleList.length; i++) {
            scrapped.push({name:titleList[i], dir:directionList[i], val:parseFloat(valueList[i]), unit:unitList[i]});
        }

        logger.debug(scrapped);
        this.fill_database(scrapped);
    }
}

module.exports = ClimateNasaGovScrapper;
