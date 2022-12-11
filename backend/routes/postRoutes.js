const express = require('express')
const router = express.Router()

const { getPosts,
    getPost,
    createPost, 
    updatePost, 
    deletePost, 
    getPostsByPoi,
} = require ('../controllers/postController')

const { protect } = require('../middleware/authMiddleware')

router.get('/users/:userid/posts/:id', getPost)
router.get('/users/:userid/posts', getPosts)

router.post('/users/:userid/posts', protect, createPost)
router.put('/users/:userid/posts/:id', protect, updatePost)
router.delete('/users/:userid/posts/:id', protect, deletePost)

router.get('/pois/:poiid/posts', getPostsByPoi)

module.exports = router