import Vue from 'vue';
import Vuex from 'vuex';
import { post } from 'api/index.js';
Vue.use(Vuex);

const shouldShowMsg: any[] = [];
const friends: any[] = [];
export default new Vuex.Store({
    state: {
        friends,
        shouldShowMsg,
        loading: true
    },
    mutations: {
        changeFriends(state, data) {
            state.friends = Object.assign([], data);
        },
        changeShouldShowMsg(state, data: any) {
            if (Array.isArray(data)) {
                state.shouldShowMsg = Object.assign([], data);
            } else {
                state.shouldShowMsg.push(data);
            }
        },
        changeLoading(state,flag = false) {
            state.loading = flag;
        },
        shouldShowMsgClear(state) {
            state.shouldShowMsg = [];
        } 
    },
    actions: {
        async getFriends(store, params) {
            post('/getuser', {uid: params.uid}).then((res: any) => {
                store.commit('changeFriends', res.data);
            })
        },
        async getShouldShowMsg(store, params) {
            post('/getmsgoto', {
                uid1: params.uid1,
                uid2: params.uid2
            }).then((res: any) => {
                store.commit('changeShouldShowMsg', res.data);
            })
        },
    },
});
