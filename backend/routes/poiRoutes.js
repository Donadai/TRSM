const express = require('express')
const router = express.Router()
const { getPois, 
    setPoi, 
    updatePoi, 
    deletePoi, 
} = require ('../controllers/poiController')

router.route('/').get(getPois).post(setPoi)
router.route('/:id').put(updatePoi).delete(deletePoi)

module.exports = router