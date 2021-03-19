const express = require('express')
const session = require('express-session')
const { indexRoute } = require('./src/routing/index/indexRoute')
const { unauthorizedRoute } = require('./src/routing/auth/unauthorizedRoute')
const { authRoute } = require('./src/routing/auth/authRoute')
const { projectsListRoute } = require('./src/routing/projects/projectsListRoute')
const { projectDetailsRoute } = require('./src/routing/projects/projectDetailsRoute')
const { indexRouteHandler } = require('./src/routing/index/indexRouteHandler')
const { unauthorizedRouteHandler } = require('./src/routing/auth/unauthorizedRouteHandler')
const { authRouteHandler } = require('./src/routing/auth/authRouteHandler')
const { projectsListRouteHandler } = require('./src/routing/projects/projectsListRouteHandler')
const { projectDetailsRouteHandler } = require('./src/routing/projects/projectDetailsRouteHandler')

const app = express()
const port = 3000

app.use('/public', express.static('public'))

app.use(
  session({
    cookie: { 
      maxAge: 3600000
    },
    resave: true,
    saveUninitialized: false,
    secret: "4-8-15-16-23-42",
  })
)

app.get(indexRoute, indexRouteHandler)
app.get(unauthorizedRoute, unauthorizedRouteHandler)
app.get(authRoute, authRouteHandler)
app.get(projectsListRoute, projectsListRouteHandler)
app.get(projectDetailsRoute, projectDetailsRouteHandler)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})