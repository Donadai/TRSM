const mongoose = require('mongoose')

const poiSchema = mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        roi: { type: mongoose.Types.ObjectId, ref:"Roi", required: true},
        description:  { type: String },
    },
    {
        timestamps: true
    }
)
module.exports = mongoose.model('Poi', poiSchema)