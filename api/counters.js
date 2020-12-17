const express = require("express");
const appCounters = express();

// static data for day 16.12.2020 22:30 (today)
// 1. tons of co2 into the atmosphere https://www.theworldcounts.com/challenges/climate-change/global-warming/global-co2-emissions/story
// 2. tons of melted ice https://www.theworldcounts.com/challenges/climate-change/global-warming/the-melting-ice-caps/story
// 3. terajoules of electricity used https://www.theworldcounts.com/challenges/climate-change/energy/global-energy-consumption/story
// 4. tons of waste dumped https://www.theworldcounts.com/challenges/planet-earth/state-of-the-planet/world-waste-facts/story
// 5. tons of resorces extracted from earth https://www.theworldcounts.com/challenges/planet-earth/state-of-the-planet/resources-extracted-from-earth/story
// 6. tons of plastic dumped in oceans https://www.theworldcounts.com/challenges/planet-earth/oceans/plastic-in-the-ocean/story
const countersData = [11086000, 1925080, 198150, 5464000, 228391000, 32765]

appCounters.route('/').get((req, res) => {
    res.send(countersData)
})


module.exports = appCounters
