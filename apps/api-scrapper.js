class ApiScrapper {
    counter = 0
    constructor() {

    }
    scrap() {
        console.log(`Scrap scrap ${this.counter++}`)
    }
}

module.exports = ApiScrapper;