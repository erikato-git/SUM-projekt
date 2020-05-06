const config = require('../config')

// Google Cloud Firestore opsætning
const admin = require('firebase-admin')

const serviceAccount = require('../serviceAccountKey.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

//db ref
const db = admin.firestore()

exports.createUser = function(username, passwd) {
  // lav evt. et check om brugeren findes i forvejen

  // returner en Promise
  return db.collection('Users').doc().set({
    username: username,
    password: passwd,
    datecreated: (new Date().toISOString().slice(0,10))
  })
}

exports.authenticateUser = function(username, passwd) {
  db.collection('Users')
  .where('username', '==', username)
  .where('password', '==', passwd)
  .get()
  .then((snapshot) => {
    if (snapshot.empty) {
      // db fandt ingen username/password
      // så redirect til login igen
      return
    } else {
      snapshot.forEach(document => {
        const user = document.data()
        user.id = document.id
        return user
      })
    }
  })
  .catch((err)=>{
    return 
  })
}