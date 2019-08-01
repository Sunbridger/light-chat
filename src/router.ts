import Vue from 'vue';
import Router from 'vue-router';
import Home from 'view/Home.vue';
import E from 'view/E.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
        path: '/e',
        name:'e',
        component: E,
    }
  ],
});
