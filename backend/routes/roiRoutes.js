const express = require('express')
const router = express.Router()

const { getRois, getRoi } = require ('../controllers/roiController')

router.route('/rois').get(getRois)
router.route('/rois/:id').get(getRoi)

module.exports = router