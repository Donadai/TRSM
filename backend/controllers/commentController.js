const asyncHandler = require('express-async-handler')
const Comment = require('../models/commentModel')
const Post = require('../models/postModel')
const User = require('../models/userModel')

// @desc    Get all comments
// @route   GET /api/users/:userid/posts/:postid/comments
// @access  Private
const getComments = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.params.userid)
        if (!user) { res.status(400).send('User not found') }
        else {
            const post = await Post.findById(req.params.postid)
            if (!post) { res.status(400).send('Post not found') }
            else {
                const comments = await Comment.find({ post: post })
                res.status(200).json(comments)
            }
        }
    } catch (error) {
        res.status(400).json(error)
    }
})

// @desc    Get comment by id
// @route   GET /api/users/:userid/posts/:postid/comments/:id
// @access  Private
const getComment = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.params.userid)
        if (!user) { res.status(400).send('User not found') }
        else {
            const post = await Post.findById(req.params.postid)
            if (!post) { res.status(400).send('Post not found') }
            else {
                const comments = await Comment.find( { post: post } )
                const comment = comments.find(comment => {
                    return comment.id === req.params.id
                })
                if (!comment) { res.status(400).send('Comment not found') }
                else {
                    res.status(200).json(comment)
                }    
            }
        }
    } catch (error) {
        res.status(400).json(error)
    }
})

// @desc    Create comment
// @route   POST /api/users/:userid/posts/:postid/comments
// @access  Private
const createComment = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.params.userid)
        if (!user) { res.status(400).send('User not found') }
        else {
            const post = await Post.findById(req.params.postid)
            if (!post) { res.status(400).send('Post not found') }
            else {
                const comment = await Comment.create(req.body)
                res.status(200).json(comment) 
            }
        }
    } catch (error) {
        res.status(400).json(error)
    }
})

// @desc    Update comment
// @route   UPDATE /api/users/:userid/posts/:postid/comments/:id
// @access  Private
const updateComment = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.params.userid)
        if (!user) { res.status(400).send('User not found') }
        else {
            const post = await Post.findById(req.params.postid)
            if (!post) { res.status(400).send('Post not found') }
            else {
                const updatedComment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
                    new: true,
                })
                res.status(200).json(updatedComment)
            }
        }    
    } catch (error) {
        res.status(400).json(error)
    }
})

// @desc    Delete comment
// @route   DELETE /api/users/:userid/posts/:postid/comments/:id
// @access  Private
const deleteComment = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.params.userid)
        if (!user) { res.status(400).send('User not found') }
        else {
            const post = await Post.findById(req.params.postid)
            if(!post) { res.status(400).send('Post not found') }
            else {
                const comment = await Comment.findById(req.params.id)
                if (!comment) { res.status(400).send('Comment not found') }
                else {
                    await comment.remove()
                    res.status(200).json({id: req.params.id})
                }
            }
        }
    } catch (error) {
        res.status(400).json(error)
    }
})

// @desc    Get all comments on user posts
// @route   GET api/:userid/comments
// @access  Private
const getUserComments = asyncHandler(async (req, res) => {
    try {
        const userid = req.params.userid
        const comments = await Comment.find({user: userid}).populate('user')
        if (!comments) { res.status(400).send('No comments found') }
        res.status(200).json(comments)
    } catch (error) {
        res.status(400).json(error)
    } 
})

module.exports = {
    getComments,
    getComment,
    createComment, 
    updateComment, 
    deleteComment,
    getUserComments
}