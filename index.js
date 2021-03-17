const express = require('express')
const app = express()
const port = 3000
const fetch = require('node-fetch')
const { authorizationUrl } = require('./src/api/authorizationUrl')
const { obtainAccessTokenUrl } = require('./src/api/obtainAccessTokenUrl')
const { apiKey } = require('./src/api/apiKey')
const jsonpath = require('jsonpath')

let authHeader = "";

app.use('/public', express.static('public'))

app.get('/*',function(req,res,next){
  req.header("Authorization" , `token ${authHeader}` );
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

  res.redirect("/projects/page/1");
})

app.get('/projects/page/:page', async (req, res) => {
  const page = req.params.page || 1;
  const projects = await fetch(`http://api.hackaday.io/v1/projects?api_key=${apiKey}&page=${page}&per_page=20&sortby=newest`, {method: "GET", headers: {"content-type": "application/json"}}).then(response => response.text())
  res.render(
    "projects.ejs", 
    { 
      projects: jsonpath.query(JSON.parse(projects), '$.projects.*')
    }
  )
})

app.get('/detail', (req, res) => {
  res.send("Detail")
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})