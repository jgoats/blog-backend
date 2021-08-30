let express = require("express");
let app = express();
let router = express.Router();
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
let javaScriptModel = require("./mongoose/javascriptblogs");
let adminModel = require("./mongoose/adminregister");
let mongoose = require("mongoose");
let JavaScriptBlogs = javaScriptModel.JavaScript;
let adminRegister = adminModel.adminRegister;
require("dotenv").config();
let secret = process.env.SECRET;

app.use(express.urlencoded({ extended: true }));
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
app.get("/admin", (req, res) => {
    res.render("adminlogin");
})
app.post("/login", (req, res) => {
    adminRegister.findOne({ username: req.body.username })
        .then((admin) => {
            if (!admin) res.json({ admin: false });
            if (admin) {
                if (comparePassword(req.body.password, admin.password)) {
                    token = generateAccessToken(req.body.username);
                    // res.cookie('token', token, { httpOnly: true });
                    res.json({ token: token, username: req.body.username });
                }
                else {
                    res.json({ password: false });
                }
            }
        }).catch((err) => {
            if (err) {
                console.log(res.send(err));
            }
        })
})
/*app.post("/register", (req, res) => {
    adminRegister.findOne({ username: req.body.username })
        .then((user) => {
            if (user) {
                res.send({ user })
            }
            else {
                adminRegister.create({
                    username: req.body.username,
                    password: generateHash(req.body.password)
                }).then((result) => {
                    if (result) {
                        res.send({ result: "user was successfully created" })
                    }
                }).catch((err) => {
                    if (err) {
                        res.send("couldn't create an account")
                    }
                })
            }
        }).catch((err) => {
            if (err) {
                console.log("there was an error")
            }
        })
})*/

app.listen(3000, (err) => {
    if (err) {
        console.log("please try again")
    }
    console.log("running on port " + 3000);
})

function generateHash(password) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}
function comparePassword(password, hash) {
    return bcrypt.compareSync(password, hash);
}
function generateAccessToken(username) {
    let limit = 60 * 30;
    let expires = Math.floor(Date.now() / 1000) + limit;
    let payload = {
        username: username,
        exp: expires
    }
    return jwt.sign(payload, secret);
}
function authenticateToken(req, res, next) {
    const authHeader = req.header("Authorization");
    const [type, token] = authHeader.split(" ");
    if (type === "Bearer" && typeof token !== undefined) {
        try {
            jwt.verify(token, secret, (err, user) => {
                if (err) return res.sendStatus(401);
                req.username = user;
                next();
            });

        }
        catch (err) {
            res.status(401).send({ result: "expired or invalid token" })
        }
    } else {
        res.status(401).send({ result: "you arent logged in, access denied" })
    }
}