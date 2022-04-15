const { error } = require("console");
const express = require("express");
const path = require("path")
const app = express();
app.use(express.static(path.join(__dirname, 'public')))

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
    try {
        res.render("index");

    } catch (error) {
        next(error);
    }
})

app.use((err,req,res,next) => {
    res.render("error", err);
})

app.listen(3000, () => {
    console.log("LISTENING ON PORT 3000");
})