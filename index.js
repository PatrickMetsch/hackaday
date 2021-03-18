const express = require('express')
const session = require('express-session')
const fetch = require('node-fetch')
const { authorizationUrl } = require('./src/api/authorizationUrl')
const { jsonGetOptions } = require("./src/api/jsonGetOptions")
const { obtainAccessTokenUrl } = require('./src/api/obtainAccessTokenUrl')
const { allProjectsSortedByDate } = require("./src/api/allProjectsRequestUrl")
const { projectDetailByIdUrl } = require("./src/api/projectDetailByIdUrl")
const { userByIdUrl } = require("./src/api/userByIdUrl")
const { truncatedStringsList } = require("./src/utils/arrays/truncatedStringsList")

const app = express()
const port = 3000

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
  const text = await fetch(obtainAccessTokenUrl(code), jsonGetOptions).then(response => response.text())
  const accessToken = JSON.parse(text).access_token;

  req.session.access_token = `token ${accessToken}`;

  res.redirect("/projects/page/1");
})

app.get('/projects/page/:page', async (req, res) => {
  const page = req.params.page || 1;

  const response = await fetch(allProjectsSortedByDate(page)(10), jsonGetOptions).then(response => response.json())

  const { projects, last_page } = response

  const truncatedDescriptions = 
    truncatedStringsList(projects.map(a => a.description || "No Description Available"))(120)

  res.render(
    "projects.ejs", 
    { 
      projects, 
      truncatedDescriptions,
      page: parseInt(page),
      lastPage: parseInt(last_page)
    }
  )
})

app.get('/detail/id/:id', async (req, res) => {
  const projectId = req.params.id;
  const {owner_id, ...rest} = await fetch(projectDetailByIdUrl(projectId), jsonGetOptions).then(response => response.json())
  const owner = await fetch(userByIdUrl(owner_id), jsonGetOptions).then(response => response.json())

  res.render(
    "projectDetails.ejs", 
    { 
      project: {owner_id, ...rest},
      owner
    }
  )
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})