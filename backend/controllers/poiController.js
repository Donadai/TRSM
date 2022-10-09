const asyncHandler = require('express-async-handler')

// @desc    Get points of interest
// @route   GET /api/pois
// @access  Private
const getPois = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Get pois' })
})

// @desc    Set point of interest
// @route   POST /api/pois
// @access  Private
const setPoi = asyncHandler(async (req, res) => {
    if (!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')
    }
    res.status(200).json({message: 'Set poi'})
})

// @desc    Update point of interest
// @route   UPDATE /api/pois/:id
// @access  Private
const updatePoi = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Update poi ${req.params.id}`})
})

// @desc    Delete point of interest
// @route   DELETE /api/pois/:id
// @access  Private
const deletePoi = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Delete poi ${req.params.id}`})
})

module.exports = {
    getPois, 
    setPoi, 
    updatePoi, 
    deletePoi,
}