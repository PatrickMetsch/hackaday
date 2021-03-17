const express = require('express')
const app = express()
const port = 3000
const fetch = require('node-fetch')
const { authorizationUrl } = require('./src/api/authorizationUrl')
const { obtainAccessTokenUrl } = require('./src/api/obtainAccessTokenUrl')

app.use('/public', express.static('public'))

app.get('/', async (req, res) => {
  // const text = await fetch(authorizationUrl, { method: "GET" }).then(response => response.text())
  res.render("home.ejs")
})

app.get('/auth/:code', async (req, res) => {
  const code = req.query.code;
  // const text = await fetch(obtainAccessTokenUrl(code), {method: "GET"}).then(response => response.text())
  res.send(text)
})

app.get('/projects', (req, res) => {
  res.send("Projects")
})

app.get('/detail', (req, res) => {
  res.send("Detail")
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})