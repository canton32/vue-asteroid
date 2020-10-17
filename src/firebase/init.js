import firebase from 'firebase/app'
import 'firebase/auth'

// The configuration below is not sensitive data. You can serenely add your config here
const config = {
  apiKey: 'AIzaSyDYAjlty3rLGfewRv9XlXTBx2uSdVRHQhA',
  authDomain: 'neows-567b1.firebaseapp.com',
  databaseURL: 'https://neows-567b1.firebaseio.com',
  projectId: 'neows-567b1',
  storageBucket: 'neows-567b1.appspot.com',
  messagingSenderId: '729571018821',
  appId: '1:729571018821:web:e2d3098e16ceaf2741fb2c',
}

firebase.initializeApp(config)
