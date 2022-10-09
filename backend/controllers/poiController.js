const asyncHandler = require('express-async-handler')

const POI = require('../models/poiModel')

// @desc    Get points of interest
// @route   GET /api/pois
// @access  Private
const getPois = asyncHandler(async (req, res) => {
    const pois = await POI.find()

    res.status(200).json(pois)
})

// @desc    Set point of interest
// @route   POST /api/pois
// @access  Private
const setPoi = asyncHandler(async (req, res) => {
    if (!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')
    }

    const poi = await POI.create({
        text: req.body.text,
    })

    res.status(200).json(poi)
})

// @desc    Update point of interest
// @route   UPDATE /api/pois/:id
// @access  Private
const updatePoi = asyncHandler(async (req, res) => {
    const poi = await POI.findById(req.params.id)

    if(!poi){
        res.status(400)
        throw new Error('POI not found')
    }

    const updatedPOI = await POI.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedPOI)
})

// @desc    Delete point of interest
// @route   DELETE /api/pois/:id
// @access  Private
const deletePoi = asyncHandler(async (req, res) => {
    const poi = await POI.findById(req.params.id)

    if(!poi){
        res.status(400)
        throw new Error('POI not found')
    }

    await poi.remove()

    res.status(200).json({id: req.params.id})
})

module.exports = {
    getPois, 
    setPoi, 
    updatePoi, 
    deletePoi,
}