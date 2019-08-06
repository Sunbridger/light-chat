import Vue from 'vue';
import Router from 'vue-router';
import Login from 'view/login.vue';
import Register from 'view/register.vue';
import Chat from 'view/chat.vue';
import Home from 'view/home.vue'

Vue.use(Router);


const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: {
          name: 'login'
      },
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
    },
    {
        path: '/home',
        name: 'home',
        component: Home,
    },
    {
        path: '/chat',
        name:'chat',
        component: Chat,
        beforeEnter: (to, from, next) => {
            if (window.localStorage.uid && to.params.uid) {
                next()
            } else {
                next({
                    name: 'login'
                })
            }
        }
    }
  ],
});


export default router;