const asyncHandler = require('express-async-handler')
const POI = require('../models/poiModel')

// @desc    Get all points of interest
// @route   GET /api/pois
// @access  Private
const getPois = asyncHandler(async (req, res) => {
    const pois = await POI.find().populate('roi')

    if(!pois){
        res.status(400)
        throw new Error('Points of interest not found')
    }

    res.status(200).json(pois)
})

// @desc    Get point of interest by id
// @route   GET /api/pois/:id
// @access  Private
const getPoi = asyncHandler(async (req, res) => {
    const poi = await POI.findById(req.params.id).populate('roi')

    if(!poi){
        res.status(400)
        throw new Error('Point of interest not found')
    }

    res.status(200).json(poi)
})

// @desc    Create point of interest
// @route   POST /api/pois
// @access  Private
const createPoi = asyncHandler(async (req, res) => {
    if (!req.body){
        res.status(400)
        throw new Error('Please add values')
    }
    const poi = await POI.create(req.body)

    res.status(200).json(poi)
})

// @desc    Update point of interest
// @route   UPDATE /api/pois/:id
// @access  Private
const updatePoi = asyncHandler(async (req, res) => {
    const poi = await POI.findById(req.params.id)

    if(!poi){
        res.status(400)
        throw new Error('Point of interest not found')
    }

    const updatedPOI = await POI.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    }).populate('roi')

    res.status(200).json(updatedPOI)
})

// @desc    Delete point of interest
// @route   DELETE /api/pois/:id
// @access  Private
const deletePoi = asyncHandler(async (req, res) => {
    const poi = await POI.findById(req.params.id)

    if(!poi){
        res.status(400)
        throw new Error('Point of interest not found')
    }

    await poi.remove()

    res.status(200).json({id: req.params.id})
})

module.exports = {
    getPois,
    getPoi,
    createPoi, 
    updatePoi, 
    deletePoi,
}