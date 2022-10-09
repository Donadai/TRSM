const express = require('express')
const router = express.Router()

const { getCountries, getCountry } = require ('../controllers/countryController')

router.route('/countries').get(getCountries)
router.route('/countries/:id').get(getCountry)

module.exports = router