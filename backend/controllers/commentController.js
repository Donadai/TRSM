const asyncHandler = require('express-async-handler')
const Comment = require('../models/commentModel')
const Post = require('../models/postModel')

// @desc    Get all comments
// @route   GET /api/comments
// @access  Private
const getComments = asyncHandler(async (req, res) => {
    const comments = await Comment.find().populate(['user', 'post'])

    if(!comments){
        res.status(400)
        throw new Error('Comment not found')
    }

    res.status(200).json(comments)
})

// @desc    Get comment by id
// @route   GET /api/comments/:id
// @access  Private
const getComment = asyncHandler(async (req, res) => {
    const comment = await Comment.findById(req.params.id).populate(['user', 'post'])

    if(!comment){
        res.status(400)
        throw new Error('Comment not found')
    }

    res.status(200).json(comment)
})

// @desc    Create comment
// @route   POST /api/comments
// @access  Private
const createComment = asyncHandler(async (req, res) => {
    if (!req.body){
        res.status(400)
        throw new Error('Please add values')
    }
    const comment = await Comment.create(req.body)

    res.status(200).json(comment)
})

// @desc    Update comment
// @route   UPDATE /api/comments/:id
// @access  Private
const updateComment = asyncHandler(async (req, res) => {
    const comment = await Comment.findById(req.params.id)

    if(!comment){
        res.status(400)
        throw new Error('Comment not found')
    }

    const updatedComment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedComment)
})

// @desc    Delete comment
// @route   DELETE /api/comments/:id
// @access  Private
const deleteComment = asyncHandler(async (req, res) => {
    const comment = await Comment.findById(req.params.id)

    if(!comment){
        res.status(400)
        throw new Error('Comment not found')
    }

    await comment.remove()

    res.status(200).json({id: req.params.id})
})

// @desc    Get all comments on user posts
// @route   GET api/:userid/comments
// @access  Private
const getCommentsOnUserPosts = asyncHandler(async (req, res) => {
    const userid = req.params.userid
    //const posts = await Post.find({ user: userid })
    //const comments = await Comment.find({post: posts}).populate('post', 'user')

    const comments = await Comment.find({user: userid}).populate('user')

    if(!comments){
        res.status(400)
        throw new Error('Comments not found')
    }

    res.status(200).json(comments)
})

module.exports = {
    getComments,
    getComment,
    createComment, 
    updateComment, 
    deleteComment,
    getCommentsOnUserPosts
}