const mongoose = require('mongoose')

const userPostSchema = mongoose.Schema(
    {
        poi: { type: mongoose.Types.ObjectId, ref:"Poi", required: true },
        user: { type: mongoose.Types.ObjectId, ref:"User", required: true },
        image: { type: String, required: true },
        description: { type: String, required: true }
    },
    {
        timestamps: true
    }
)
module.exports = mongoose.model('Post', userPostSchema)