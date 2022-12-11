const mongoose = require('mongoose')

const poiSchema = mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        roi: { type: mongoose.Types.ObjectId, ref:"Roi", required: true},
        description:  { type: String },
        image: {type: String, required: true}
    },
    {
        timestamps: true
    }
)
module.exports = mongoose.model('Poi', poiSchema)