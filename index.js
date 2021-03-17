const express = require('express')
const app = express()
const port = 3000
const fetch = require('node-fetch')
const { authorizationUrl } = require('./src/api/authorizationUrl')
const { obtainAccessTokenUrl } = require('./src/api/obtainAccessTokenUrl')

let authHeader = "";

app.use('/public', express.static('public'))

app.get('/*',function(req,res,next){
  res.header("Authorization" , `token ${authHeader}` );
  next();
});

app.get('/', async (req, res) => {
  res.redirect(authorizationUrl);
})

app.get('/auth', async (req, res) => {
  const code = req.query.code;
  const text = await fetch(obtainAccessTokenUrl(code), {method: "GET"}).then(response => response.text())
  const accessToken = JSON.parse(text).access_token;

  authHeader = accessToken;
  res.set("Authorization",  `token ${accessToken}`)

  res.redirect("/projects");
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