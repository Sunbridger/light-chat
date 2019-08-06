import Vue from 'vue';
import Vuex from 'vuex';
import { post } from 'api/index.js';
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        friends: []
    },
    mutations: {
        changeFriends(state, payload) {
            Object.assign(state.friends, payload)
        }
    },
    actions: {
        async getFriends(store) {
            post()
            store.commit('changeFriends',)
        }
    },
});
