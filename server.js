let express = require("express");
let app = express();
let router = express.Router();
let javaScriptModel = require("./mongoose/javascriptblogs");
let mongoose = require("mongoose");
let JavaScriptBlogs = javaScriptModel.JavaScript;
require("dotenv").config();

app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");


mongoose.connect(process.env.CONNECTION_STRING,
    { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on("open", () => {
    console.log("mongoose connected!")
})


app.get("/", (req, res) => {
    JavaScriptBlogs.find()
        .then((result) => {
            res.render("index", { blogs: result })
        }).catch((err) => {
            console.log("error")
        })
})

app.listen(3000, (err) => {
    if (err) {
        console.log("please try again")
    }
    console.log("running on port " + 3000);
})