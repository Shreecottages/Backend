const mongoose = require("mongoose");


// Define the image schema
const videoSchema = new mongoose.Schema({
    Link: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    }

});

// Create the image model
const Video = mongoose.model('Video', videoSchema);

module.exports = Video;