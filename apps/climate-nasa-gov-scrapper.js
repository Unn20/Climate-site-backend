const urllib = require('urllib');
const cheerio = require('cheerio');

class ClimateNasaGovScrapper {
    url = 'https://climate.nasa.gov/';

    constructor() {
    }

    fill_database() {
        // TODO: Connect to database and insert found values
    }

    run() {
        this.scrap();
    }

    scrap() {
        console.log('Scrapper doing his thing');
        urllib.request(this.url, (err, data, res) => {
            if (err) {
                throw err;
            }
            const $ = cheerio.load(data.toString());

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
            console.log('Titles');
            console.log(titleList);

            // Extract direction of change from html
            let directions = $('div.rate_of_change div.value', counters);
            let directionList = [];
            // For each found div with class value
            directions.each((i, element) => {
                // this div has always two classes first is either up or down, second is value
                let direction = $(element).attr('class').split(' ')[0];
                directionList.push(direction);
            })
            console.log('Directions');
            console.log(directionList);


            // Extract change number from html
            let values = $('div.change_number', 'div.rate_of_change', counters);
            let valueList = [];
            // For each found div with class change_number
            values.each((i, value) => {
                // Remove newline at the beginning and end of string
                let slicedValue = $(value).text().slice(1, -1);
                valueList.push(slicedValue);
            })
            console.log('Change numbers');
            console.log(valueList);

            // Extract units from html
            let units = $('div.units', 'div.rate_of_change', counters);
            let unitList = [];
            // For each found div with class unit
            units.each((i, unit) => {
                // Remove newline at the beginning and end of string
                let slicedUnit = $(unit).text().slice(1, -1);
                unitList.push(slicedUnit);
            })
            console.log('Units');
            console.log(unitList);

            this.fill_database();
        })
    }
}

module.exports = ClimateNasaGovScrapper;
