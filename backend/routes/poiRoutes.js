const express = require('express')
const router = express.Router()

const { getPois,
    getPoi,
    createPoi, 
    updatePoi, 
    deletePoi,
    getPoisByCountry
} = require ('../controllers/poiController')

const { protect } = require('../middleware/authMiddleware')

router.get('/pois', getPois)
router.get('/pois/:id', getPoi)

router.post('/pois', protect, createPoi)
router.put('/pois/:id', protect, updatePoi)
router.delete('/pois/:id', protect, deletePoi)

router.route('/:countryid/pois').get(getPoisByCountry)

module.exports = router