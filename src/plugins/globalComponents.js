import { ValidationProvider, ValidationObserver } from 'vee-validate';
/**
 * You can register global components here and use them as a plugin in your main Vue instance
 */

const GlobalComponents = {
  install(Vue) {
    Vue.component('validation-provider', ValidationProvider)
    Vue.component('validation-observer', ValidationObserver)
  }
};

export default GlobalComponents;
