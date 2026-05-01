const express = require("express");
const app = express();
const { nanoid } = require("nanoid");
const shortId = nanoid(10);

app.post("/shorten/:url", (req, res) => {
  const getUrl = req.params.url;
  const shortUrl = `https://localhost:3000/${shortId}`;
});
