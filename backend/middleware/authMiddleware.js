const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async(req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1]
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // Get user info from the token
            req.id = decoded.id
            req.role = decoded.role;

           next()
        } catch (error) {
            res.status(401).send('Unauthorized')
        }
    }

    if (!token) {
        res.status(401).send('Unauthorized, no token')
    }
})

module.exports = { protect }