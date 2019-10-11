const express = require("express")
const TSV = require('tsv')
const fs = require('fs');
const { check, validationResult } = require("express-validator")

const router = new express.Router()

let citiesData = {}

// reading the cities.tsv file
fs.readFile( __dirname + '/../data/cities.tsv', function (err, data) {
    if (err) {
      throw err; 
    }

    citiesData = TSV.parse(data.toString())
});

  
router.get("/", [
    check("q").not().isEmpty().withMessage("Missing field 'q").escape().trim(),
    check("latitude").not().isEmpty().withMessage("Missing field 'latitude").custom((value) => (value ? !isNaN(value) : true)).withMessage("'latitude' query parameter recieved invalid value").escape().trim(),
    check("longitude").not().isEmpty().withMessage("Missing field 'longitude").custom((value) => (value ? !isNaN(value): true)).escape().withMessage("'longitude' query parameter recieved invalid value").trim()
], (req, res) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        res.status(400).json({
            message: "Bad request!",
            errors: errors.array().map(e => e.msg)
        })
        return
    }

    const query = req.query.q.toLowerCase()
    const lat = req.query.latitude
    const long = req.query.longitude

    let suggestedCities = []

    citiesData.forEach(data => {
        const condition_1 = data.name ? data.name.toLowerCase().includes(query) : null
        const condition_2 = data.alt_name ? data.alt_name.toLowerCase().split(',').includes(query) : null
        
        // Algorithm to calculate score
        let score = 0
        let diffLat = Math.abs(data.lat - lat)
        let diffLong = Math.abs(data.long - long)

        score = 10 - (diffLat + diffLong) / 2

        score = score > 0 ? Math.round(score) / 10 : 0

        if(condition_1 || condition_2) {
            suggestedCities.push({
                name: `${data.name}, ${isNaN(data.admin1) ? data.admin1 + ', ' : ''}${data.country === "CA" ? "Canada" : "USA"}`,
                latitude: data.lat,
                longitude: data.long,
                score
            })
        }
    })

    // sorting suggestion by descending order of scores
    suggestedCities = suggestedCities.sort((a, b) => {
        return b.score - a.score
    })

    res.send(suggestedCities)
})

module.exports = router
