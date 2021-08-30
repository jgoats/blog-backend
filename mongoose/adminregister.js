let mongoose = require("mongoose");

let register = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

let adminRegister = mongoose.model("adminRegister", register, "adminAccount");
module.exports.adminRegister = adminRegister;