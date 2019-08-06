import Vue from 'vue';
import Vuex from 'vuex';
import { post, get } from 'api/index.js';
Vue.use(Vuex);

const shouldShowMsg: any[] = [];
const friends: any[] = []
export default new Vuex.Store({
    state: {
        friends,
        shouldShowMsg
    },
    mutations: {
        changeFriends(state, data) {
            state.friends = Object.assign([], data);
        },
        changeShouldShowMsg(state, data: any) {
            if (Array.isArray(data)) {
                state.shouldShowMsg = Object.assign([], data);
                console.log(state.shouldShowMsg, 'state.shouldShowMsg')
            } else {
                state.shouldShowMsg.push(data);
            }
        }
    },
    actions: {
        async getFriends(store) {
            post('/getuser', {uid: window.localStorage.uid}).then((res: any) => {
                store.commit('changeFriends', res.data);
            })
        },
        async getShouldShowMsg(store, params) {
            post('/getmsgoto', {
                uid1: window.localStorage.uid,
                uid2: params.uid
            }).then((res: any) => {
                store.commit('changeShouldShowMsg', res.data);
            })
        },
    },
});
