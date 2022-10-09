const express = require('express')
const router = express.Router()

const { getPois,
    getPoi,
    createPoi, 
    updatePoi, 
    deletePoi,
    getPoisByCountry
} = require ('../controllers/poiController')

router.route('/pois').get(getPois).post(createPoi)
router.route('/pois/:id').get(getPoi).put(updatePoi).delete(deletePoi)
router.route('/:countryid/pois').get(getPoisByCountry)

module.exports = router