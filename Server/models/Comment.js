const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    postId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    comments: {
        type: String,
        required: true
    }
});


module.exports  = mongoose.model('comment', CommentSchema);

