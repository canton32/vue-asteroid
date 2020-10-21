const mutations = {
  SET_ASTEROIDS: (state, asteroids) => (state.asteroids = asteroids),
  SET_LIKES: (state, likes) => (state.likes = likes),
  SET_LOADING: (state, loading) => (state.loading = loading),
  SET_ERROR: (state, error) => (state.error = error),
  SET_PAGE: (state, page) => (state.page = page)
}

export default mutations
