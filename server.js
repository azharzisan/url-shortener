const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const {nanoid} = require("nanoid");
const { ChildProcess } = require("child_process");


app.use(express.json())

app.post("/shorten", (req, res) => {
    const shortUrlExt = nanoid(10);
    const {url} = req.body;

    const urlsData = {
        id: crypto.randomUUID(),
        baseUrl : url,
        redirectingUrl : `http://locahost:3000/${shortUrlExt}`
    }
    const existingRaw = fs.readFileSync(path.join(__dirname, "data", "urls.json"), "utf-8")
    const existingData = JSON.parse(existingRaw) ?? []

    const updated = [...existingData, urlsData]
    fs.writeFileSync(path.join(__dirname, "data", "urls.json"), JSON.stringify(updated, null, 2))

    res.json(urlsData)
})

app.listen(3000, () => {
    console.log("http://localhost:3000")
})