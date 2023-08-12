const mongoose = require('mongoose')

const BlogSchema = new mongoose.Schema({
    TopicName: String,
    Category : String,
    createdAt: {
        type: Date,
        default: Date.now()
    }

})

const blog = new mongoose.model("Blog", BlogSchema);
module.exports = blog;