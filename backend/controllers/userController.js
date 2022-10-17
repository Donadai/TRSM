const e = require('express')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc    Get all users
// @route   GET /api/users
// @access  Private
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find()
    if(!users){
        res.status(400).send('No users found')
    } else {
        res.status(200).json(users)
    }
})

// @desc    Get user by id
// @route   GET /api/users/:id
// @access  Private
const getUser = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) { res.status(400).send('User not found') }
        else { res.status(200).json(user) }
    } catch (error) {
        res.status(400).json(error)
    }
})

// @desc    Create user
// @route   POST /api/users
// @access  Private
const createUser = asyncHandler(async (req, res) => {
    try {
        const user = await User.create(req.body)
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json(error)
    }
})

// @desc    Update user
// @route   UPDATE /api/users/:id
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) { res.status(400).send('User not found') }
        else {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
            })
            res.status(200).json(updatedUser)
        }    
    } catch (error) {
        res.status(400).json(error)
    }
})

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) { res.status(400).send('User not found') }
        else {
            await user.remove()
            res.status(200).json({ id: req.params.id })
        }
    } catch (error) {
        res.status(400).json(error)
    }
})

module.exports = {
    getUsers,
    getUser,
    createUser, 
    updateUser, 
    deleteUser
}