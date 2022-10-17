const express = require('express')
const router = express.Router()

const { getComments,
    getComment,
    createComment, 
    updateComment, 
    deleteComment, 
    getUserComments
} = require ('../controllers/commentController')

router.route('/users/:userid/posts/:postid/comments').get(getComments).post(createComment)
router.route('/users/:userid/posts/:postid/comments/:id').get(getComment).put(updateComment).delete(deleteComment)
router.route('/users/:userid/comments').get(getUserComments)

module.exports = router