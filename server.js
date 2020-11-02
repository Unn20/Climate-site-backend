const express = require("express");
const bodyParser = require('body-parser')

const app = express();
const cors = require('cors')

var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))

app.route('/api/cats').get((req, res) => {
    res.send({
        //cats: [{ name: 'lilly', color: 'black' }, { name: 'lucy', color: 'white' }, { name: 'brock', age: 12 }, { name: 'venturion', cyborg: true }],
        cats: [{ name: 'lilly', color: 'black' }, { name: 'lucy', color: 'white' }]
    })
})


app.route('/api/cats/:name').get((req, res) => {
    const requestedCatName = req.params['name']
    res.send({ name: requestedCatName })
})


app.use(bodyParser.json())
app.route('/api/cats').post((req, res) => {
    res.send(201, req.body)
})


// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to my backend." });
});


app.route('/api/cats/:name').put((req, res) => {
    res.send(200, req.body)
})


app.route('/api/cats/:name').delete((req, res) => {
    res.sendStatus(204)
})


// set port, listen for requests
app.listen(8000, () => {
    console.log('Server started!')
})
