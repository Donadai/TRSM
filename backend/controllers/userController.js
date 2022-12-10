const e = require('express')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

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
// @access  Public
const createUser = asyncHandler(async (req, res) => {
    const { username, password, display_name, email } = req.body;

    // Check if user exists
    const usernameExists = await User.findOne({username})
    const emailExists = await User.findOne({email})

    if (usernameExists) { res.status(400).send('Username taken.')}
    else if (emailExists) { res.status(400).send('User with this email already exists')}
    else {
        // Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        try {
            const user = await User.create({
                username, password: hashedPassword, display_name, email
            })
            res.status(200).json({user: user, token: generateToken(user.id, user.role)})
        } catch (error) {
            res.status(400).json(error)
        }
    }
})

// @desc    Update user
// @route   UPDATE /api/users/:id
// @access  Private
const updateUser = asyncHandler(async (req, res) => {

    const { username, password, display_name, email, profile_image } = req.body

    if (req.id == req.params.id){
        try {
            const user = await User.findById(req.id)
            if (!user) { res.status(400).send('User not found') }
            else {
                const salt = await bcrypt.genSalt(10)
                const hashedPassword = await bcrypt.hash(password, salt)

                const updatedUser = await User.findByIdAndUpdate(req.id, 
                    {username, password: hashedPassword, display_name, email, profile_image},
                    {
                    new: true,
                })
                res.status(200).json(updatedUser)
            }    
        } catch (error) {
            res.status(400).json(error)
        }
    }
    else { res.status(401).send('Unauthorized') }

})

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
    if (req.id == req.params.id || req.role == 'ADMIN'){
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
    } else { res.status(401).send('Unauthorized') }
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async(req, res) => {
    const {username, password} = req.body

    // Check for username
    const user = await User.findOne({username})

    if (user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({user: user, token: generateToken(user.id, user.role)})
    }
    else {res.status(400).send('Invalid user data')}
})

const getMe = asyncHandler(async(req, res) => {
    try {
        const user = await User.findById(req.id)
        res.status(200).json({user: user, role: req.role})
    } catch (error) {
        res.status(400).json(error)
    }

})

// Generate JWT 
const generateToken = (id, role) => {
    return jwt.sign({id, role}, process.env.JWT_SECRET, {expiresIn: '30d'})
}

module.exports = {
    getUsers,
    getUser,
    createUser, 
    updateUser, 
    deleteUser,
    loginUser,
    getMe,
}