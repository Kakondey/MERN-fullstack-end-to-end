const mongoose = require('mongoose');

const LocationSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Locations', LocationSchema);