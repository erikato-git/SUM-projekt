const express = require('express')
const app = express()
app.set('view engine', 'pug')

app.use(express.static('assets'))

const admin = require('firebase-admin')
const serviceAccount = require('./serviceAccountKey.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore()


// Dette er post data encoding
app.use(express.json())
app.use(express.urlencoded())

// Session opsætning
session = require('express-session');
app.use(session({
  secret: 'ADCC58BA-6703-4795-B94D-6C562784DAEB'
}))


dummyBruger = {
	brugernavn: 'jensJensen',
	hashed_kodeord: '6bd8937a8789a3e58489c4cfd514b1a7',
	salt: '1A8FB30',
	mail_adresse: 'jensjensen@mail.dk',
	telefon_nummer: '112',
	adresse: 'Vollsmose',
	billede_URI: 'static/billede/001.png',
	postnummer: 5240,
	by: 'Odense',
	fornavn: 'Jens',
	efternavne: 'Jensen',
	Fødelsedato: '1970-01-01'
}

app.get('/', (req, res)=>{
  
	res.send('hej')
	res.end()
  
})

app.get('/dumpBruger', (req, res)=>{
  

  dumpBruger().then(
  	 (data) => {
        res.send(data)
        res.end()
  });

  
})

app.get('/insert', (req, res) => {
  db.collection('bruger')
  .doc()
  .set(dummyBruger)
  .then(() => {
    res.send('Du har nu indsat noget data i databasen')
    res.end()
  })
})


app.listen(8080, ()=>console.log('Server started on port 8080'))



async function dumpBruger() {
    const snapshot = await db.collection('bruger').get()
    return snapshot.docs.map(doc => doc.data());
}

