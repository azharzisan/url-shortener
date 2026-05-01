const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const {nanoid} = require("nanoid");
const { json } = require("stream/consumers");

const shortUrlExt = nanoid(10);

app.use(express.json())

app.post("/shorten", (req, res) => {
    const {url} = req.body;

    const UrlsData = {
        baseUrl : url,
        redirectingUrl : `http://locahost:3000/${shortUrlExt}`
    }
    res.json(UrlsData)
    fs.writeFileSync(path.join(__dirname, "data", "urls.json"), JSON.stringify(UrlsData))
})

app.listen(3000, () => {
    console.log("http://localhost:3000")
})