const asyncHandler = require('express-async-handler')
const Post = require('../models/postModel')
const User = require('../models/userModel')
const POI = require('../models/poiModel')

// @desc    Get all posts
// @route   GET /api/users/:userid/posts
// @access  Private
const getPosts = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.params.userid)
        if (!user) { res.status(400).send('User not found') }
        else {
            const posts = await Post.find({ user: user }).populate(['poi', 'user'])
            res.status(200).json(posts)
        }
    } catch (error) {
        res.status(400).json(error)
    }
})

const getPostById = asyncHandler(async (req, res) => {
    try {
        const post = await Post.findById(req.params.postid)
        res.status(200).json(post)
    } catch (error) {
        res.status(400).json(error)
    }
})

const getAllPosts = asyncHandler(async (req, res) => {
    try {
        const posts = await Post.find().populate(['poi', 'user'])
        res.status(200).json(posts)
    } catch (error) {
        res.status(400).json(error)
    }
})

const getPostsByPoi = asyncHandler(async (req, res) => {
    try {
        const poi = await POI.findById(req.params.poiid)
        if (!poi) { res.status(400).send('Point of interest not found') }
        else {
            const posts = await (await Post.find({ poi: poi })).reverse()
            res.status(200).json(posts)
        }
    } catch (error) {
        res.status(400).json(error)
    }
})

// @desc    Get post by id
// @route   GET /api/users/:userid/posts/:id
// @access  Private
const getPost = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.params.userid)
        if (!user) { res.status(400).send('User not found') }
        else {
            const post = await Post.findById(req.params.id).populate(['poi', 'user'])
            if (!post) { res.status(400).send('Post not found') }
            else {
                res.status(200).json(post)
            }
        }
    } catch (error) {
        res.status(400).json(error)
    }
})

// @desc    Create post
// @route   POST /api/users/:userid/posts
// @access  Private
const createPost = asyncHandler(async (req, res) => {
    if (req.id == req.params.userid) {
        try {
            const user = await User.findById(req.params.userid)
            if (!user) { res.status(400).send('User not found') }
            else {    
                const { poi, image, description } = req.body
                const findpoi = await POI.findById(poi)
                if (!findpoi) { res.status(400).send('Point of interest not found') }
                else {
                    const post = await Post.create({ poi, user, image, description })
                    res.status(200).json(post)
                }
            }
        } catch (error) {
            res.status(400).json(error)
        }
    } else {
        res.status(401).send('Unauthorized')
    }

})

// @desc    Update post
// @route   UPDATE /api/users/:userid/posts/:id
// @access  Private
const updatePost = asyncHandler(async (req, res) => {
    if (req.id == req.params.userid) {
        try {
            const user = await User.findById(req.params.userid)
            if (!user) { res.status(400).send('User not found') }
            else {
                const post = await Post.findById(req.params.id)
                if (!post) { res.status(400).send('Post not found') }
                else {
                    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
                        new: true,
                    })
                    res.status(200).json(updatedPost)
                }
            }    
        } catch (error) {
            res.status(400).json(error)
        }
    } else {
        res.status(401).send('Unauthorized')
    }
})

// @desc    Delete post
// @route   DELETE /api/users/:userid/posts/:id
// @access  Private
const deletePost = asyncHandler(async (req, res) => {
    if (req.id == req.params.userid || req.role == 'MOD') {
        try {
            const user = await User.findById(req.params.userid)
            if (!user) { res.status(400).send('User not found') }
            else {
                const post = await Post.findById(req.params.id)
                if(!post) { res.status(400).send('Post not found') }
                else {
                    await post.remove()
                    res.status(200).json({id: req.params.id})
                }
            }
        } catch (error) {
            res.status(400).json(error)
        }
    } else {
        res.status(401).send('Unauthorized')
    }
})

module.exports = {
    getPosts,
    getPostById,
    getPost,
    createPost, 
    updatePost, 
    deletePost,
    getAllPosts,
}