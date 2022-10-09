const asyncHandler = require('express-async-handler')
const Post = require('../models/postModel')

// @desc    Get all posts
// @route   GET /api/posts
// @access  Private
const getPosts = asyncHandler(async (req, res) => {
    const posts = await Post.find().populate(['poi', 'user'])

    if(!posts){
        res.status(400)
        throw new Error('Posts not found')
    }

    res.status(200).json(posts)
})

// @desc    Get post by id
// @route   GET /api/posts/:id
// @access  Private
const getPost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id).populate(['poi', 'user'])

    if(!post){
        res.status(400)
        throw new Error('Post not found')
    }

    res.status(200).json(post)
})

// @desc    Create post
// @route   POST /api/posts
// @access  Private
const createPost = asyncHandler(async (req, res) => {
    if (!req.body){
        res.status(400)
        throw new Error('Please add values')
    }
    const post = await Post.create(req.body)

    res.status(200).json(post)
})

// @desc    Update post
// @route   UPDATE /api/posts/:id
// @access  Private
const updatePost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id)

    if(!post){
        res.status(400)
        throw new Error('Post not found')
    }

    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedPost)
})

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private
const deletePost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id)

    if(!post){
        res.status(400)
        throw new Error('Post not found')
    }

    await post.remove()

    res.status(200).json({id: req.params.id})
})

module.exports = {
    getPosts,
    getPost,
    createPost, 
    updatePost, 
    deletePost
}