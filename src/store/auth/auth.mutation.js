const mutations = {
  SET_USER: (state, user) => (state.user = user),
  SET_LOADING: (state, loading) => (state.loading = loading),
  SET_ERROR: (state, error) => (state.error = error)
}

export default mutations
