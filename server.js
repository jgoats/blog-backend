const express = require("express");
let app = express();
let router = express.Router();

app.set("view engine", "ejs");
// specifying that any routes created here will be behind "/articles"
app.use("/articles", router);

app.get("/", (req, res) => {
    const articles = [{
        title: "my first blog",
        description: "i love coding",
        content: "jim flew over the baron"
    }]
    res.render("index", { articles: articles });
})
router.get("/", (req, res) => {
    res.send("in articles");
})

app.listen(3000, () => {
    console.log("listening on port 3000");
})