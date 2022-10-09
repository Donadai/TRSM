const express = require('express')
const router = express.Router()

const { getRois, getRoi, getRoiByCountry } = require ('../controllers/roiController')

router.route('/rois').get(getRois)
router.route('/rois/:id').get(getRoi)
router.route('/:countryid/rois').get(getRoiByCountry)

module.exports = router