const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        username: { type: String, required: true },
        password: { type: String, required: true },
        display_name: { type: String, required: true },
        email: { type: String, required: true },
        profile_image: { type: String },
    },
    {
        timestamps: true
    }
)
module.exports = mongoose.model('User', userSchema)