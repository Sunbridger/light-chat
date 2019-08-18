import Vue from 'vue';
import Router from 'vue-router';
import Login from 'view/login.vue';
import Register from 'view/register.vue';
import Chat from 'view/chat.vue';
import Home from 'view/home.vue'
import Write from 'view/write.vue'
Vue.use(Router);


const router = new Router({
  mode: 'hash',
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
        component: Chat

    },
    {
        path: '/write',
        name:'write',
        component: Write

    }
  ],
});
const fnScrol =(h = 0) => {
    setTimeout(() => {
        window.scrollTo({ 
            top: h, 
            behavior: "smooth" 
        });
    }, 500);
}
router.beforeEach((to, from, next) => {
    if (window.localStorage.uid) {
        if (to.name == 'chat') {
            if (to.params.uid) {
                next()
            } else {
                next({
                    name: 'home'
                })
            }
        } else if (to.name == 'home' || to.name === 'write') {
            next()
        } else {
            next({
                name: 'home'
            })
        }
    } else {
        if (to.name == 'login' || to.name == 'register') {
            next();
        } else {
            next({
                name: 'login'
            })
        }
    }
})

export default router;