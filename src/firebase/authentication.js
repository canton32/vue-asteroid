import firebase from 'firebase/app'
import store from '@/store'
import UsersDB from '@/firebase/users-db'

firebase.auth().onAuthStateChanged(async (firebaseUser) => {
  if (firebaseUser) {
    const userFromFirebase = await new UsersDB().read(firebaseUser.uid)
    store.commit('auth/SET_USER', userFromFirebase)
  }
})
