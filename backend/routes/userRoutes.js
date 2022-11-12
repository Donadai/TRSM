const express = require('express')
const router = express.Router()

const { getUsers,
    getUser,
    createUser, 
    updateUser, 
    deleteUser,
    loginUser,
    getMe,
} = require ('../controllers/userController')

const { protect } = require('../middleware/authMiddleware')

router.get('/users/me', protect, getMe)

router.get('/users/:id', getUser)
router.route('/users').get(getUsers).post(createUser)
router.route('/users/login').post(loginUser)

router.put('/users/:id', protect, updateUser)
router.delete('/users/:id', protect, deleteUser)

module.exports = router