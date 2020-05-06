const express = require('express')
const app = express()

const config = require('./config')

// Logging - så req bliver mere synlig i consollen
const morgan = require('morgan')
app.use(morgan('tiny'))

// anvend assets mappe til statiske filer
app.use(express.static('assets'))

// template engine opsætning
app.set('view engine', 'pug')



// Dette er post data encoding
app.use(express.json())
app.use(express.urlencoded())

// Session opsætning
session = require('express-session');
app.use(session({
  secret: config.sessionSecret
}))

// mere middleware
// check om man er logget ind

// ALLE ROUTES KOMMER HER
const loginRouter = require('./routes/login')
app.use('/login', loginRouter)

// Start server
app.listen(config.serverPort, () => console.log(`Server started on port ${config.serverPort}`))
