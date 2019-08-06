import Vue from 'vue';
import Vuex from 'vuex';
import { post, get } from 'api/index.js';
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        friends: []
    },
    mutations: {
        changeFriends(state, data) {
            state.friends = Object.assign([], data);
        }
    },
    actions: {
        async getFriends(store) {
            post('/getuser', {uid: window.localStorage.uid}).then((res: any) => {
                store.commit('changeFriends', res.data);
            })
        }
    },
});
