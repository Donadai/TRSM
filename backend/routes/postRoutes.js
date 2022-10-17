const express = require('express')
const router = express.Router()

const { getPosts,
    getPost,
    createPost, 
    updatePost, 
    deletePost, 
} = require ('../controllers/postController')

router.route('/users/:userid/posts').get(getPosts).post(createPost)
router.route('/users/:userid/posts/:id').get(getPost).put(updatePost).delete(deletePost)

module.exports = router