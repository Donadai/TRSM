const express = require('express')
const {ROI} = require("../models/roiModel")
const router = express.Router()

const { getPois,
    getPoi,
    createPoi, 
    updatePoi, 
    deletePoi, 
} = require ('../controllers/poiController')

router.route('/pois').get(getPois).post(createPoi)
router.route('/pois/:id').get(getPoi).put(updatePoi).delete(deletePoi)

module.exports = router