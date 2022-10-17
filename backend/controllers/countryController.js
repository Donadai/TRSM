const asyncHandler = require('express-async-handler')
const Country = require('../models/countryModel')

// @desc    Get all countries
// @route   GET /countries
// @access  Private
const getCountries = asyncHandler(async (req, res) => {
    const countries = await Country.find()

    if(!countries){ res.status(400).send('No countries found.') }
    else { res.status(200).json(countries) }
})

// @desc    Get country by id
// @route   GET /countries/:id
// @access  Private
const getCountry = asyncHandler(async (req, res) => {
    try {
        const country = await Country.findById(req.params.id)
        if(!country) { 
            res.status(400).send('Country not found.') 
        } else { 
            res.status(200).json(country) 
        }
    } catch (error) {
        res.status(400).json(error)
    }
})

module.exports = {
    getCountries,
    getCountry
}