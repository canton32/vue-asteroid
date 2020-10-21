import { remove } from 'lodash'
import axios from 'axios'
import UserLikesDB from '@/firebase/user-likes-db'

const actions = {
  /**
   * Fetch asteroids using browse api
   */
  getAsteroids: async ({ commit }, page) => {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    try {
      const res = await axios.get('/neo/browse', {
        params: {
          page: page,
          size: process.env.VUE_APP_NEOWS_PAGE_SIZE,
        },
      })

      commit('SET_PAGE', res.data.page)
      commit('SET_ASTEROIDS', res.data.near_earth_objects)
      commit('SET_LOADING', false)
      commit('SET_ERROR', null)
    } catch (err) {
      console.log(err)
      commit('SET_LOADING', false)
      commit('SET_ERROR', err)
    }
  },
  /**
   * Fetch liked asteroids using firebase
   */
  getLikes: async ({ commit }) => {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    try {
      const uid = localStorage.getItem('uid')
      const userLikesDb = new UserLikesDB(uid)
      const likes = await userLikesDb.readAll()

      commit('SET_LIKES', likes.map(like => like.id))
      commit('SET_LOADING', false)
      commit('SET_ERROR', null)
    } catch (err) {
      console.log(err)
      commit('SET_LOADING', false)
      commit('SET_ERROR', err)
    }
  },
  /**
   * Create a like for current loggedin user
   */
  createUserLike: async ({ commit, state }, id) => {
    const uid = localStorage.getItem('uid')
    const userLikesDb = new UserLikesDB(uid)
    try {
      await userLikesDb.create({
        id
      })
      commit('SET_LIKES', [...state.likes, id])
    } catch (err) {
      console.log(err)
    }
  },
  /**
   * Delete a like for current loggedin user
   */
  deleteUserLike: async ({ commit, state }, id) => {
    const uid = localStorage.getItem('uid')
    const userLikesDb = new UserLikesDB(uid)
    try {
      await userLikesDb.delete(id)
      commit('SET_LIKES',  remove(state.likes, (el) => el !== id))
    } catch (err) {
      console.log(err)
    }
  },
  /**
   * Fetch closet approach asteroids using feed api
   */
  getFeed: async ({ commit }, dateRange) => {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    try {
      const res = await axios.get('/feed', {
        params: {
          start_date: dateRange.startDate,
          end_date: dateRange.endDate,
        },
      })

      commit('SET_ASTEROIDS', res.data.near_earth_objects)
      commit('SET_LOADING', false)
      commit('SET_ERROR', null)
    } catch (err) {
      commit('SET_LOADING', false)
      commit('SET_ERROR', err)
    }
  },
}

export default actions
