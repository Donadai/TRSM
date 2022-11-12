const express = require('express')
const router = express.Router()

const { getPostComments,
    getComment,
    createComment, 
    updateComment, 
    deleteComment, 
    getMyComments
} = require ('../controllers/commentController')

const { protect } = require('../middleware/authMiddleware')


router.get('/users/:userid/posts/:postid/comments', getPostComments)
router.get('/users/:userid/posts/:postid/comments/:id', getComment)

router.get('/me/comments', protect, getMyComments)
router.post('/users/:userid/posts/:postid/comments', protect, createComment)
router.put('/users/:userid/posts/:postid/comments/:id', protect, updateComment)
router.delete('/users/:userid/posts/:postid/comments/:id', protect, deleteComment)

module.exports = router