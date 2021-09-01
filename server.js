let express = require("express");
let app = express();
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
let javaScriptModel = require("./mongoose/javascriptblogs");
let adminModel = require("./mongoose/adminregister");
let cors = require("cors");
let mongoose = require("mongoose");
let JavaScriptBlogs = javaScriptModel.JavaScript;
let adminRegister = adminModel.adminRegister;
require("dotenv").config();
let secret = process.env.SECRET;
var cookieParser = require('cookie-parser');
let session = require("express-session");
//app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");

mongoose.connect(process.env.CONNECTION_STRING,
    { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on("open", () => {
    console.log("mongoose connected!")
})

app.get("/deletecookie", (req, res) => {
    res.status(202).clearCookie("jwt").send("cookie was cleared");
})
app.get("/dashboard", authenticateToken, (req, res) => {
    res.send("user is authenticated!!!");
})

app.post("/login", (req, res) => {
    adminRegister.findOne({ username: req.body.username })
        .then((admin) => {
            if (!admin) res.json({ admin: false });
            if (admin) {
                if (comparePassword(req.body.password, admin.password)) {
                    async function generateAccessToken(username) {
                        let payload = {
                            username: username
                        }
                        let token = jwt.sign(payload, secret);
                        await res.status(200).cookie('jwt', token,
                            { httpOnly: true, sameSite: true, maxAge: 1000 * 60 * 60 }).send('well done')
                    }
                    generateAccessToken(req.body.username);

                }
            }
            else {
                res.json({ password: false });
            }
        }).catch((err) => {
            if (err) {
                console.log(res.send(err));
            }
        })
})

app.listen(4000, (err) => {
    if (err) {
        console.log("please try again")
    }
    console.log("running on port " + 4000);
})
function comparePassword(password, hash) {
    return bcrypt.compareSync(password, hash);
}
function authenticateToken(req, res, next) {
    try {
        var cookie = req.headers.cookie;
        var index = cookie.indexOf("=");
        var token = cookie.slice(index + 1);
        var name = cookie.slice(0, index);
    }
    catch (err) {
        res.send("token doesnt exist");
    }
    if (name === "jwt" && token !== undefined) {
        try {
            jwt.verify(token, secret, (err, user) => {
                if (err) return res.sendStatus(401);
                req.username = user;
                next();
            });
        }
        catch (err) {

        }
    }
}
