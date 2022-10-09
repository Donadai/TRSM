const mongoose = require('mongoose')

const userCommentSchema = mongoose.Schema(
    {
        userPost: { type: mongoose.Types.ObjectId, ref:"Post", required: true },
        text: { type: String,required: true },
    },
    {
        timestamps: true
    }
)
module.exports = mongoose.model('Comment', userComment)