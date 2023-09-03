const mongoose = require("mongoose");


// Define the image schema
const imageSchema = new mongoose.Schema({
    filename: String,
    originalname: String,
    size: Number,
    category: String,
    index: Number,
    path: String,
    desc: String
});

// Create the image model
const Image = mongoose.model('Image', imageSchema);

module.exports = Image;