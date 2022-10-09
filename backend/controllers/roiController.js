const asyncHandler = require('express-async-handler')
const ROI = require('../models/roiModel')

// @desc    Get all regions of interest
// @route   GET api/rois
// @access  Private
const getRois = asyncHandler(async (req, res) => {
    const rois = await ROI.find().populate('country')

    if(!rois){
        res.status(400)
        throw new Error('No regions of interest found')
    }

    res.status(200).json(rois)
})

// @desc    Get region of interest by id
// @route   GET api/rois/:id
// @access  Private
const getRoi = asyncHandler(async (req, res) => {
    const roi = await ROI.findById(req.params.id).populate('country')

    if(!roi){
        res.status(400)
        throw new Error('Region of interest not found')
    }

    res.status(200).json(roi)
})

// @desc    Get region of interests by country
// @route   GET api/:countryid/rois
// @access  Private
const getRoiByCountry = asyncHandler(async (req, res) => {
    const countryId = req.params.countryid
    console.log(countryId)
    const rois = await ROI.find({country: countryId}).populate('country')

    if(!rois){
        res.status(400)
        throw new Error('Region of interest not found')
    }

    res.status(200).json(rois)
})

module.exports = {
    getRois,
    getRoi,
    getRoiByCountry
}