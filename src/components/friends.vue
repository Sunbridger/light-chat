<template>
    <div>
        <div 
            v-for="friend in friends" 
            :key="friend.uid" 
            class="flex" 
            @click="getChat(friend)">
            <el-badge 
                :value="getNum(friend.uid)" 
                :max="10"  
                class="item">    
                <el-avatar shape="square" :size="50" :src="friend.avatar"></el-avatar>
            </el-badge>
            <p class="flex1">
                {{friend.name}}</p>
            <p v-if="onlineFn(friend.uid)" 
                class="font-grenn">在线</p>
            <p v-else 
                class="font-red">离线</p>
        </div>
    </div>
</template>

<script>
import {  post, wsEmit } from 'api';
import { mapActions, mapMutations } from 'vuex';

export default {
   data() {
       return {
            onlineFriends: [],
            uid: window.localStorage.uid,
            myavatar: window.localStorage.avatar,
            loading: true,
       }
   },
   computed: {
        friends() {
            return this.$store.state.friends;
        }
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            this.changeLoading(true)
            this.getFriends({uid: this.uid});
            this.getWhoOnline();
        },
        ...mapActions([
            'getFriends',
        ]),
        ...mapMutations([
            'changeLoading'
        ]),
        getNum(uid) {
            const key = this.uid + '-' + uid;
            let num = this.getStroage(key);
            return num;
        },
        getWhoOnline() {
            post('/whoOnline', {uid: this.uid}).then(({data}) => {
                this.changeLoading();
                this.onlineFriends = data;
            })
        },
        getChat(friend) {
            this.$router.push({
                name: 'chat',
                params: friend
            })
        },
        onlineFn(uid) {
            return this.onlineFriends.includes(uid);
        }
    },
};
</script>
<style lang="less">
    .flex {
        display: flex;
        margin-bottom: 20px;
        .flex1 {
            flex: 1;
            margin: 0 0 0 10px;
            line-height: 50px;
            border-bottom: 1px solid #ccc;
        }
        .font-red {
            color: #909399;
        }
        .font-grenn {
            color: #67C23A;
        }
    }
</style>
