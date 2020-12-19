const puppeteer = require('puppeteer');
const dataBaseConnector = require("../database/data-base-connector");

// 1. tons of co2 into the atmosphere https://www.theworldcounts.com/challenges/climate-change/global-warming/global-co2-emissions/story
// 2. tons of melted ice https://www.theworldcounts.com/challenges/climate-change/global-warming/the-melting-ice-caps/story
// 3. terajoules of electricity used https://www.theworldcounts.com/challenges/climate-change/energy/global-energy-consumption/story
// 4. tons of waste dumped https://www.theworldcounts.com/challenges/planet-earth/state-of-the-planet/world-waste-facts/story
// 5. tons of resorces extracted from earth https://www.theworldcounts.com/challenges/planet-earth/state-of-the-planet/resources-extracted-from-earth/story
// 6. tons of plastic dumped in oceans https://www.theworldcounts.com/challenges/planet-earth/oceans/plastic-in-the-ocean/story
// section.hero div.column div button - index=3 - button to press
// section.hero div.counter - wartość licznika

class CountersScrapper {
    urls = {
        co2: "https://www.theworldcounts.com/challenges/climate-change/global-warming/global-co2-emissions/story",
        meltedIce: "https://www.theworldcounts.com/challenges/climate-change/global-warming/the-melting-ice-caps/story",
        terajoulesUsed: "https://www.theworldcounts.com/challenges/climate-change/energy/global-energy-consumption/story",
        wasteDumped: "https://www.theworldcounts.com/challenges/planet-earth/state-of-the-planet/world-waste-facts/story",
        resourcesExtracted: "https://www.theworldcounts.com/challenges/planet-earth/state-of-the-planet/resources-extracted-from-earth/story",
        plasticInOcean: "https://www.theworldcounts.com/challenges/planet-earth/oceans/plastic-in-the-ocean/story"
    }

    constructor() {

    }

    run() {
        console.log("Scrapper getting counters data");
        this.aRun().then(() => { console.log("Scrapped")});
    }

    async aRun() {
        const countersData = {co2: 0, meltedIce: 0, terajoulesUsed: 0, wasteDumped: 0,
            resourcesExtracted: 0, plasticInOcean: 0};
        const browser = await puppeteer.launch().catch((e) => {console.log(e);});
        const page = await browser.newPage().catch((e) => {console.log(e);});

        for (const [key, url] of Object.entries(this.urls)) {
            await page.goto(url).catch((e) => {console.log(e);});
            await page.waitForNavigation({timeout:4000}).catch(() => {});

            countersData[key] = await this.getCounterValue(page).catch((e) => {console.log(e);});
        }

        console.log(countersData);

        this.handleDatabase(countersData);
    }

    handleDatabase(scrapped) {
        dataBaseConnector.save_data_from_counters(scrapped);
        console.log("Counters data inserted into database");
    }

    async getCounterValue(page) {
        // select button to filter data by today only
        const button = await page.$('section.hero div.column div button:last-child').catch((e) => {console.log(e);});
        await button.evaluate( button => button.click() ).catch((e) => {console.log(e);});

        // select counter and get text inside its div
        const counter = await page.$('section.hero div.counter').catch((e) => {console.log(e);});
        const value = await counter.evaluate(counter => counter.textContent, counter).catch((e) => {console.log(e);});

        // Remove commas from data
        let valueText = value.toString();
        while (valueText.includes(',')) {
            valueText = valueText.replace(',', '');
        }

        return parseInt(valueText);
    }

}

module.exports = CountersScrapper;
