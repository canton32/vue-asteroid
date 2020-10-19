import { isNil } from 'lodash'

const getters = { isUserLoggedIn: (state) => !isNil(state.user) }

export default getters
