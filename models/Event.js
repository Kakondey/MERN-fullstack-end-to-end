const mongoose = require('mongoose');

const EventSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description:  {
        type: String,
        required: true
    },
    categories:  [{
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "Categories"
    }],
    location:  {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "Locations"
    },
    date:  {
        type: Date,
        required: true
    },
    comments: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comments'
        }]
    }
}, { timestamps: true })

module.exports = mongoose.model('Events', EventSchema);