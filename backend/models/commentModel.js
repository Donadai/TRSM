const mongoose = require('mongoose')

const userCommentSchema = mongoose.Schema(
    {   
        user: { type: mongoose.Types.ObjectId, ref: "User", required: true},
        post: { type: mongoose.Types.ObjectId, ref:"Post", required: true },
        text: { type: String,required: true },
    },
    {
        timestamps: true
    }
)
module.exports = mongoose.model('Comment', userCommentSchema)