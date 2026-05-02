const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const {nanoid} = require("nanoid");
const { ADDRCONFIG } = require("dns");

app.use(express.json())

app.post("/shorten", (req, res) => {
    const shortUrlExt = nanoid(10);
    const {url} = req.body;

    const urlsData = {
        id: crypto.randomUUID(),
        baseUrl : url,
        redirectingUrl : `http://localhost:3000/${shortUrlExt}`
    }
    const existingRaw = fs.readFileSync(path.join(__dirname, "data", "urls.json"), "utf-8")
    const existingData = JSON.parse(existingRaw) ?? []

    const updated = [...existingData, urlsData]
    fs.writeFileSync(path.join(__dirname, "data", "urls.json"), JSON.stringify(updated, null, 2))

    res.json(urlsData)
})

const originalUrl = JSON.parse(fs.readFileSync(path.join(__dirname, "data", "urls.json"), "utf-8"))

app.get('/all', (req, res) => {
    const data = JSON.parse(
      fs.readFileSync(path.join(__dirname, "data", "urls.json"), "utf-8"),
    );
    if(!data) return res.status(404).json({message: 'data not found'})
    res.json(data)
})

app.get(`/:code`, (req, res) => {
    const {code} = req.params
    const target = originalUrl.find((i) => i.redirectingUrl === `http://localhost:3000/${code}`)
    
    if(!target) return res.status(404).json({message: 'url not found'})

    res.redirect(target.baseUrl)    
});

app.listen(3000, () => {
    console.log("http://localhost:3000")
})