const express = require('express')
const router = express.Router()

const { getPosts,
    getPostById,
    getPost,
    createPost, 
    updatePost, 
    deletePost, 
    getAllPosts,
    
} = require ('../controllers/postController')

const { protect } = require('../middleware/authMiddleware')

router.get('/posts', getAllPosts)
router.get('/posts/:postid', getPostById)
router.get('/users/:userid/posts/:id', getPost)
router.get('/users/:userid/posts', getPosts)
router.post('/users/:userid/posts', protect, createPost)
router.put('/users/:userid/posts/:id', protect, updatePost)
router.delete('/users/:userid/posts/:id', protect, deletePost)

module.exports = router