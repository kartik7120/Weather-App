// import express from "express";
const { error } = require("console");
const express = require("express");
const path = require("path")
// import { Express as express } from "express";
const app = express();
app.use(express.static(path.join(__dirname, 'public')))

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
    try {
        // if (res)
        res.render("index");
        // else
        //     throw new Error("OH NO ERROR");
    } catch (error) {
        next(error);
    }
})

app.use((req, res, next, err) => {
    res.render("error", err);
})

app.listen(3000, () => {
    console.log("LISTENING ON PORT 3000");
})