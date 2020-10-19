import firebase from 'firebase/app'
import UsersDB from '@/firebase/users-db'

const actions = {
  signup: async ({ commit }, form) => {
    commit('SET_LOADING', true)

    try {
      // signup with email and password
      const { user } = await firebase
        .auth()
        .createUserWithEmailAndPassword(form.email, form.password)

      // create a user in firestore `users` table
      const userDb = new UsersDB()
      const newUser = {
        email: form.email,
        name: form.name,
      }
      userDb.create(newUser, user.uid)

      commit('SET_LOADING', false)
      return true
    } catch (err) {
      console.log(err)
      commit('SET_ERROR', err)
      commit('SET_LOADING', false)
      throw err
    }
  },

  // eslint-disable-next-line
  login: async ({ commit }, form) => {
    commit('SET_LOADING', true)

    try {
      // signup with email and password
      await firebase
        .auth()
        .signInWithEmailAndPassword(form.email, form.password)

      commit('SET_LOADING', false)
    } catch (err) {
      console.log(err)
      commit('SET_ERROR', err)
      commit('SET_LOADING', false)
      throw err
    }
  },

  fetchProfile: async ({ commit }, firebaseAuthUser) => {
    commit('SET_LOADING', false)
    const userFromFirebase = await new UsersDB().read(firebaseAuthUser.uid)

    localStorage.setItem('uid', firebaseAuthUser.uid)

    commit('SET_USER', userFromFirebase)
    commit('SET_LOADING', true)
  },

  logout: async ({ commit }) => {
    await firebase.auth().signOut()
    localStorage.removeItem('uid')
    commit('SET_USER', null)
  },
}

export default actions
