const express = require('express')
const router = express.Router()

const { getPosts,
    getPost,
    createPost, 
    updatePost, 
    deletePost, 
} = require ('../controllers/postController')

router.route('/posts').get(getPosts).post(createPost)
router.route('/posts/:id').get(getPost).put(updatePost).delete(deletePost)

module.exports = router