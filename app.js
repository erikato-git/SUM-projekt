const express = require('express')
const app = express()
app.set('view engine', 'pug')

app.use(express.static('assets'))

// Dette er post data encoding
app.use(express.json())
app.use(express.urlencoded())

// Session opsætning
session = require('express-session');
app.use(session({
  secret: 'ADCC58BA-6703-4795-B94D-6C562784DAEB'
}))


app.get('/', (req, res)=>{
  res.send('hej')
  res.end()
})


app.listen(8080, ()=>console.log('Server started on port 8080'))
