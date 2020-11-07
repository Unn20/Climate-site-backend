const express = require("express");
const appCats = express();

appCats.route('/').get((req, res) => {
    res.send({
        //cats: [{ name: 'lilly', color: 'black' }, { name: 'lucy', color: 'white' }, { name: 'brock', age: 12 }, { name: 'venturion', cyborg: true }],
        cats: [{ name: 'lilly', color: 'black' }, { name: 'lucy', color: 'white' }]
    })
})
appCats.route('/:name').get((req, res) => {
    const requestedCatName = req.params['name']
    res.send({ name: requestedCatName })
})
appCats.route('/').post((req, res) => {
    res.send(201, req.body)
})
appCats.route('/:name').put((req, res) => {
    res.send(200, req.body)
})
appCats.route('/:name').delete((req, res) => {
    res.sendStatus(204)
})

module.exports = appCats