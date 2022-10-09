const express = require('express')
const router = express.Router()

const { getComments,
    getComment,
    createComment, 
    updateComment, 
    deleteComment, 
    getCommentsOnUserPosts
} = require ('../controllers/commentController')

router.route('/comments').get(getComments).post(createComment)
router.route('/comments/:id').get(getComment).put(updateComment).delete(deleteComment)
router.route('/:userid/comments').get(getCommentsOnUserPosts)

module.exports = router