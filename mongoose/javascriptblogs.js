let mongoose = require("mongoose");

let blogs = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    content: {
        type: String,
        required: true
    },
    time: {
        type: String,
        default: new Date()
    },
    screenshot: {
        type: String,
        default: `<img class='blog-image'
        src='http://localhost:4000/images/screenshot.png'/>`
    }
})

let JavaScript = mongoose.model("blogs", blogs, "JavaScriptBlogs");
module.exports.JavaScript = JavaScript;