const express = require('express')
const session = require('express-session')
const app = express()
const port = 3000
const fetch = require('node-fetch')
const { authorizationUrl } = require('./src/api/authorizationUrl')
const { obtainAccessTokenUrl } = require('./src/api/obtainAccessTokenUrl')
const { apiKey } = require('./src/api/apiKey')
const jsonpath = require('jsonpath')
const { allProjectsSortedByDate } = require("./src/api/allProjectsRequestUrl")

app.use('/public', express.static('public'))

app.use(
  session({
    cookie: { 
      maxAge: 86400
    },
    resave: false,
    saveUninitialized: false,
    secret: "4-8-15-16-23-42",
  })
)

app.get('/', async (req, res) => {
  if(!req.session.access_token){
    res.redirect(authorizationUrl);
  }
  else {
    res.redirect("/projects/page/1")
  }
})

app.get('/auth', async (req, res) => {
  const code = req.query.code;
  const text = await fetch(obtainAccessTokenUrl(code), {method: "GET"}).then(response => response.text())
  const accessToken = JSON.parse(text).access_token;

  req.session.access_token = `token ${accessToken}`;

  res.redirect("/projects/page/1");
})

app.get('/projects/page/:page', async (req, res) => {
  const page = req.params.page || 1;

  const response = await fetch(
    allProjectsSortedByDate(page)(10), {
      method: "GET", 
      headers: {
        "content-type": "application/json"
      }
    }).then(response => response.text())

  const projects = jsonpath.query(JSON.parse(response), '$.projects.*')

  res.render("projects.ejs", { projects })
})

app.get('/detail', (req, res) => {
  res.send("Detail")
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})