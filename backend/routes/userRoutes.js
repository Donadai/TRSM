const express = require('express')
const router = express.Router()

const { getUsers,
    getUser,
    createUser, 
    updateUser, 
    deleteUser, 
} = require ('../controllers/userController')

router.route('/users').get(getUsers).post(createUser)
router.route('/users/:id').get(getUser).put(updateUser).delete(deleteUser)

module.exports = router