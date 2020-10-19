import state from './data.state'
import actions from './data.actions'
import getters from './data.getters'
import mutations from './data.mutation'

const data = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}

export default data
