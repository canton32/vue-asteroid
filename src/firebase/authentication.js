import firebase from 'firebase/app'
import { isNil } from 'lodash'

import store from '@/store'
import router from '../router'

firebase.auth().onAuthStateChanged((firebaseUser) => {
  if (isNil(firebaseUser)) {
    router.push('/login')
  } else {
    store.dispatch('auth/fetchProfile', firebaseUser).then(() => {
      if (router.currentRoute.path !== '/') {
        router.push('/')
      }
    })
  }
})
