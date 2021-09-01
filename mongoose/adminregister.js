let mongoose = require("mongoose");

let register = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: false
    }
})

let adminRegister = mongoose.model("adminRegister", register, "adminAccount");
module.exports.adminRegister = adminRegister;