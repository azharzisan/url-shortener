const express = require('express');
const fs = require('fs');
const path = require('path');
const {nanoid} = require('nanoid');
const app = express()

app.use(express.json())

app.post('/shorten', (req, res) => {
    const { url } = req.body
    const shortUrl = nanoid(10)

    const existingUrl = JSON.parse(fs.readFileSync(path.join(__dirname, "data", "urls.json"), "utf-8")) || []
    const urlData = {
        id: crypto.randomUUID(),
        baseUrl : url,
        shortUrl : shortUrl
    }
    const updated = [...existingUrl, urlData]
    fs.writeFileSync(path.join(__dirname, "data", "urls.json"), JSON.stringify(updated, null, 2))

    res.json(urlData)
})

app.get('/all', (req, res) => {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, "data", "urls.json"), "utf-8")) || []
    res.json(data)
})

app.get('/:code', (req, res) => {
    const {code} = req.params

    const data = JSON.parse(fs.readFileSync(path.join(__dirname, "data", "urls.json"), "utf-8")) || []
    const target = data.find((i) => i.shortUrl === code)

    if(!target) return res.status(404).json({message: "url not found"})
    
    res.redirect(target.baseUrl)    
})

app.listen(3000, () => {
    console.log('http://localhost:3000')
})