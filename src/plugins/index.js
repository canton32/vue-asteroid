// A plugin file where you could register global directives
import GlobalDirectives from './globalDirectives.js';

// A plugin file where you could register global components used across the app
import GlobalComponents from './globalComponents';

// vue-bootstrap
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// asset imports
import '@/assets/scss/argon.scss';
import '@/assets/vendor/nucleo/css/nucleo.css';

// Validation plugin used to validate forms
import { configure } from 'vee-validate';

import { extend } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import { messages } from 'vee-validate/dist/locale/en.json';

Object.keys(rules).forEach(rule => {
  extend(rule, {
    ...rules[rule], // copies rule configuration
    message: messages[rule] // assign message
  });
});

export default {
  install(Vue) {
    Vue.use(GlobalDirectives);
    Vue.use(GlobalComponents);
    Vue.use(BootstrapVue);
    Vue.use(IconsPlugin);
    configure({
      classes: {
        valid: 'is-valid',
        invalid: 'is-invalid',
        dirty: ['is-dirty', 'is-dirty'], // multiple classes per flag!
      }
    })
  }
};
