import { remove } from 'lodash'
import axios from 'axios'
import dayjs from 'dayjs'
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

      commit(
        'SET_LIKES',
        likes.map((like) => like.id)
      )
      commit('SET_LOADING', false)
      commit('SET_ERROR', null)

      return true
    } catch (err) {
      console.log(err)
      commit('SET_LOADING', false)
      commit('SET_ERROR', err)

      return false
    }
  },
  /**
   * Fetch asteroid with specified id
   */
  getLookup: async ({ commit }, id) => {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    try {
      const res = await axios.get(`/neo/${id}`)

      commit('SET_PAGE', {
        size: process.env.VUE_APP_NEOWS_PAGE_SIZE,
        total_elements: 1,
        total_pages: 1,
        number: 0,
      })

      commit('SET_ASTEROIDS', [res.data])
      commit('SET_LOADING', false)
      commit('SET_ERROR', null)
    } catch (err) {
      commit('SET_LOADING', false)
      if (err.response.status === 404) {
        commit('SET_PAGE', {
          size: process.env.VUE_APP_NEOWS_PAGE_SIZE,
          total_elements: 0,
          total_pages: 0,
          number: 0,
        })
        commit('SET_ASTEROIDS', [])
      } else {
        commit('SET_ERROR', err)
      }
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
        id,
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
      commit(
        'SET_LIKES',
        remove(state.likes, (el) => el !== id)
      )
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
          start_date: dayjs(dateRange.startDate).format('YYYY-MM-DD'),
          end_date: dayjs(dateRange.endDate).format('YYYY-MM-DD'),
        },
      })

      let asteroids = []
      Object.keys(res.data.near_earth_objects).forEach((key) => {
        asteroids = [
          ...asteroids,
          ...res.data.near_earth_objects[key]
            .sort(
              (a, b) =>
                parseFloat(
                  a.close_approach_data[0].miss_distance.astronomical
                ) -
                parseFloat(b.close_approach_data[0].miss_distance.astronomical)
            )
            .slice(0, 10),
        ]
      })

      asteroids.sort(
        (a, b) =>
          Date.parse(a.close_approach_data[0].close_approach_date) -
          Date.parse(b.close_approach_data[0].close_approach_date)
      )

      commit('SET_PAGE', {
        size: process.env.VUE_APP_NEOWS_PAGE_SIZE,
        total_elements: asteroids.length,
        total_pages: Math.ceil(
          asteroids.length / process.env.VUE_APP_NEOWS_PAGE_SIZE
        ),
        number: 0,
      })

      commit('SET_ASTEROIDS', asteroids)
      commit('SET_LOADING', false)
      commit('SET_ERROR', null)
    } catch (err) {
      commit('SET_LOADING', false)
      commit('SET_ERROR', err)
    }
  },
}

export default actions
