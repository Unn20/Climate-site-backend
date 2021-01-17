const { describe, it } = require('mocha');
const { expect } = require('chai');

const GlobalWarmingService = require("../apps/global-warming-service")
const ClimateNasaGovScrapper = require("../apps/climate-nasa-gov-scrapper")
const CountersScrapper = require("../apps/counters-scrapper")


describe('apps/climate-nasa-gov-scrapper', () => {
    let climateNasaGovScrapper;
    beforeEach(() => {
        climateNasaGovScrapper = new ClimateNasaGovScrapper();
    })
    it('Should have valid url', () => {
        const url = climateNasaGovScrapper.url;
        expect(url).to.match(/.+\..+/);
    })
});

describe('apps/counters-scrapper App', () => {
    let countersScrapper;
    before(() => {
        countersScrapper = new CountersScrapper();
    })

    it('Should have valid urls', () => {
        for (let url in countersScrapper.urls) {
            expect(countersScrapper.urls[url]).to.match(/.+\..+/);
        }
    })
});

describe('apps/global-warming-service App', () => {
    let globalWarmingService;
    before(() => {
        globalWarmingService = new GlobalWarmingService(null)
    })

    it('Should have valid url', () => {
        const url = globalWarmingService.metadata.url;
        expect(url).to.match(/.+\..+/);
    })
});