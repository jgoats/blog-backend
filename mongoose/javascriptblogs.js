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
        default: 'https://blog-backend426.herokuapp.com/images/screenshot.png'
    }
})

let JavaScript = mongoose.model("blogs", blogs, "JavaScriptBlogs");
module.exports.JavaScript = JavaScript;