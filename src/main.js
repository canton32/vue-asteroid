import Vue from 'vue'
import App from './App.vue'

// router setup
import router from './router'

// store setup
import store from './store'

// plugins
import plugins from './plugins'

import axios from 'axios'


// firebase setup
import './firebase/init'
import './firebase/authentication'

Vue.config.productionTip = false

// axios setup
axios.defaults.baseURL = process.env.VUE_APP_NEOWS_BASE_URL
axios.defaults.params = {}
axios.defaults.params['api_key'] = process.env.VUE_APP_NEOWS_API_KEY

// plugin setup
Vue.use(plugins);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
