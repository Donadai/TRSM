const asyncHandler = require('express-async-handler')
const Country = require('../models/countryModel')

// @desc    Get all countries
// @route   GET /countries
// @access  Private
const getCountries = asyncHandler(async (req, res) => {
    const countries = await Country.find()

    if(!countries){
        res.status(400)
        throw new Error('No countries found')
    }

    res.status(200).json(countries)
})

// @desc    Get country by id
// @route   GET /countries/:id
// @access  Private
const getCountry = asyncHandler(async (req, res) => {
    const country = await Country.findById(req.params.id)

    if(!country){
        res.status(400)
        throw new Error('Country not found')
    }

    res.status(200).json(country)
})

module.exports = {
    getCountries,
    getCountry
}