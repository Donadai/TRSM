const mongoose = require('mongoose')

const roiSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        country: { type: mongoose.Types.ObjectId, ref:"Country", required: true },
    }
)
module.exports = mongoose.model('Roi', roiSchema)