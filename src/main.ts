import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/element';
import Global from '../global.js';
Vue.config.productionTip = false;
Vue.prototype.service = Global;
Vue.prototype.saveStroage = (params:any = {}) => {
    for (let key in params) {
        window.localStorage[key] = params[key]
    }
};
Vue.prototype.getStroage = (key: string) => {
    return window.localStorage[key];
};

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
