const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const {nanoid} = require("nanoid")

const shortUrlExt = nanoid(10);

app.use(express.json())

app.post("/shorten", (req, res) => {
    const {url} = req.body;

    const UrlsData = {
        baseUrl : url,
        shortUrl : shortUrlExt
    }
    res.json(UrlsData)
})

app.listen(3000, () => {
    console.log("http://localhost:3000")
})