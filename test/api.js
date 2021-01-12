const { describe, it, timeout } = require('mocha');
const { context, expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');

const appClimateData = require("../api/climate-data")
const appCounters = require("../api/counters")
const appNasaCounters = require("../api/nasa-counters")

chai.use(chaiHttp);

describe('climate-data API', () => {
    it('GET /temperature', (done) => {
        chai.request(appClimateData).get('/temperature').end((err, res) => {
            if (err) {
                expect.res.to.have.status(400);
                done(err);
            }
            expect(res).to.have.status(200);
            done();
        })
    });

    it('GET /co2', (done) => {
        chai.request(appClimateData).get('/co2').end((err, res) => {
            if (err) {
                expect.res.to.have.status(400);
                done(err);
            }
            expect(res).to.have.status(200);
            done();
        })
    });

    it('GET /methane', (done) => {
        chai.request(appClimateData).get('/methane').end((err, res) => {
            if (err) {
                expect.res.to.have.status(400);
                done(err);
            }
            expect(res).to.have.status(200);
            done();
        })
    });

    it('GET /nitrous-oxide', (done) => {
        chai.request(appClimateData).get('/nitrous-oxide').end((err, res) => {
            if (err) {
                expect.res.to.have.status(400);
                done(err);
            }
            expect(res).to.have.status(200);
            done();
        })
    });

    it('GET /arctic', (done) => {
        chai.request(appClimateData).get('/arctic').end((err, res) => {
            if (err) {
                expect.res.to.have.status(400);
                done(err);
            }
            expect(res).to.have.status(200);
            done();
        })
    });
}).timeout(5000);

describe("counters API", () => {
    it('GET /', (done) => {
        chai.request(appCounters).get('/').end((err, res) => {
            if (err) {
                expect.res.to.have.status(400);
                done(err);
            }
            expect(res).to.have.status(200);
            done();
        })
    });
}).timeout(2000);

describe("nasa-counters API", () => {
    it('GET /', (done) => {
        chai.request(appNasaCounters).get('/').end((err, res) => {
            if (err) {
                expect.res.to.have.status(400);
                done(err);
            }
            expect(res).to.have.status(200);
            done();
        })
    });
}).timeout(2000);
