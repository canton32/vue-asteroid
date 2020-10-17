import Vue from 'vue'
import App from './App.vue'

// router setup
import router from './router'

// store setup
import store from './store'

import plugins from './plugins'

Vue.config.productionTip = false

// plugin setup
Vue.use(plugins);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
