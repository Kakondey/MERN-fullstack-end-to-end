const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    user:  {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "Users"
    },
    event:  {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "Events"
    },

}, { timestamps: true })

module.exports = mongoose.model('Comments', CommentSchema);