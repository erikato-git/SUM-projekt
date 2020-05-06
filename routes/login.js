/*
LOGIN ROUTER
*/

// hent controller funktionalitet
const controller = require('../controllers/controller')

const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  if (req.session.isLoggedIn) {
    res.redirect('/userpage')
  } else {
    res.render('login', {pageTitle: 'Login', isLoggedIn: req.session.isLoggedIn})
  }
  res.end()
})

router.get('/logout', (req, res) => {
  if (req.session.isLoggedIn) {
    req.session.destroy()
    res.redirect('/')
  } else {
    res.redirect('/')
  }
  res.end()
})

router.get('/createuser', (req, res) => {
  res.render('createuser', {pageTitle: 'Opret Bruger'})
})

router.post('/createuser', (req, res) => {
  const username = req.body.username
  const password = req.body.password
  // lav check på om der står noget i username & password
  controller.createUser(username, password)
  .then(() => {
    req.session.username = username
    req.session.isLoggedIn = true
    res.redirect('/userpage')
    res.end()
  })
  .catch( (err) => {
    res.redirect('/error', {error: err})
  })
})

router.post('/auth', (req, res) => {
  const username = req.body.username
  const password = req.body.password
  // logind
  const user = controller.authenticateUser(username, password)
  // check user
  if (!user) {
    res.redirect('/login')
  } else {
    req.session.isLoggedIn = true
    //[WARNING] DON'T DO THIS user indholder password i ukrypteret form
    req.session.username = user
    res.redirect('/userpage')
  }
  res.end()
})

module.exports = router