import state from './auth.state'
import actions from './auth.actions'
import getters from './auth.getters'
import mutations from './auth.mutation'

const auth = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

export default auth
