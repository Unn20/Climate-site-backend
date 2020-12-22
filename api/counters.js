const express = require("express");
const dataBaseConnector = require("../database/data-base-connector");
const appCounters = express();

// static data for day 16.12.2020 22:30 (today)
// 1. tons of co2 into the atmosphere https://www.theworldcounts.com/challenges/climate-change/global-warming/global-co2-emissions/story
// 2. tons of melted ice https://www.theworldcounts.com/challenges/climate-change/global-warming/the-melting-ice-caps/story
// 3. terajoules of electricity used https://www.theworldcounts.com/challenges/climate-change/energy/global-energy-consumption/story
// 4. tons of waste dumped https://www.theworldcounts.com/challenges/planet-earth/state-of-the-planet/world-waste-facts/story
// 5. tons of resorces extracted from earth https://www.theworldcounts.com/challenges/planet-earth/state-of-the-planet/resources-extracted-from-earth/story
// 6. tons of plastic dumped in oceans https://www.theworldcounts.com/challenges/planet-earth/oceans/plastic-in-the-ocean/story
const countersDataBackup = [{
    id:"2020-12-16T22:30:44.000Z",
    carbon_dioxide:11086000,
    melted_id:1925080,
    tera_joules_used:198150,
    waste_dumped:5464000,
    resources_extracted:228391000,
    plastic_in_ocean:32765
}];

async function getCountersData() {
    return await dataBaseConnector.get_table_data_from_db(
        'SELECT * FROM counters ORDER BY id DESC LIMIT 5', false);
}

appCounters.route('/').get(async (req, res) => {
    let countersData = await getCountersData();
    res.send(countersData);
})

module.exports = appCounters;
