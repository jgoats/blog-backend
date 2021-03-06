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
let secret = process.env.SECRET;
let port = process.env.PORT;
var cookieParser = require('cookie-parser');
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ["https://www.justinssoftware.com", "http://www.justinssoftware.com"
        , "https://justinssoftware.com", "http://justinssoftware.com"],
    credentials: true
}))
mongoose.connect(process.env.CONNECTION_STRING,
    { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on("open", () => {
    console.log("mongoose connected!")
});

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage }).single('file');
/*
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://www.justinssoftware.com");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});*/
app.get("/", (req, res) => {
    res.send("welcome to blog-backend");
})
app.get("/getblogs", (req, res) => {
    JavaScriptBlogs.find()
        .then((blogs) => {
            res.send({ blogs: blogs });
        }).catch((err) => {
            if (err) {
                console.log(err)
            }
        })
})
app.post("/addblog", authenticateToken, (req, res) => {
    JavaScriptBlogs.findOne({ title: req.body.title })
        .then((result) => {
            if (result) {
                res.send({ title: true });
            }
            else {
                JavaScriptBlogs.create({
                    title: req.body.title,
                    description: req.body.description,
                    content: req.body.content,
                }).then((sent) => {
                    if (sent) {
                        res.send({ sent: true })
                    }
                    else {
                        res.send({ sent: false })
                    }
                }).catch((err) => {
                    if (err) {
                        res.send(err);
                    }
                })
            }
        }).catch((err) => {
            if (err) {
                res.send(err);
            }
        })
})
app.get("/dashboard", authenticateToken, (req, res) => {
    res.send({ signedIn: true });
});
app.post("/upload", authenticateToken, (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.send(err);
        }
        res.send(req.file);
    });
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
                            { maxAge: 1000 * 60 * 60, httpOnly: true, secure: true, sameSite: "None" }).send({ signedIn: true, username: req.body.username })
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
app.use(express.static('public'));

app.listen(port, (err) => {
    if (err) {
        console.log("please try again")
    }
    console.log("running on port " + port);
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
        res.send({ signedIn: false });
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
