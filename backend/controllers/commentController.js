const asyncHandler = require('express-async-handler')
const Comment = require('../models/commentModel')
const Post = require('../models/postModel')
const User = require('../models/userModel')

// @desc    Get all comments
// @route   GET /api/users/:userid/posts/:postid/comments
// @access  Private
const getPostComments = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.params.userid)
        if (!user) { res.status(400).send('User not found') }
        else {
            const post = await Post.findById(req.params.postid)
            if (!post) { res.status(400).send('Post not found') }
            else {
                const comments = await Comment.find({ post: post }).populate(['user'])
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
                const cUser = await User.findById(req.id)
                const { text } = req.body
                const comment = await Comment.create({ user: cUser, post: post, text })
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
                const comment = await Comment.findById(req.params.id)
                if (!comment) { res.status(400).send('Comment not found') }
                else {
                    if (req.id == comment.user._id) {
                        const updatedComment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
                            new: true,
                        })
                        res.status(200).json(updatedComment)
                    } else { res.status(401).send('Unauthorized') }
                }
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
                    if (req.id == comment.user._id || req.role == 'MOD') {
                        await comment.remove()
                        res.status(200).json({id: req.params.id})
                    } else { res.status(401).send('Unauthorized') }
                }
            }
        }
    } catch (error) {
        res.status(400).json(error)
    }
})

// @desc    Get all user coments
// @route   GET api/me/comments
// @access  Private
const getMyComments = asyncHandler(async (req, res) => {
    try {
        const comments = await Comment.find({user: req.id}).populate('user')
        if (!comments) { res.status(400).send('No comments found') }
        res.status(200).json(comments)
    } catch (error) {
        res.status(400).json(error)
    } 
})

module.exports = {
    getPostComments,
    getComment,
    createComment, 
    updateComment, 
    deleteComment,
    getMyComments
}