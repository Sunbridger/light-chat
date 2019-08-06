<template>
    <div>
        <div class="nav-top">
            <p class="nav-p-t">
                欢迎您<span>{{title}}</span>
            </p>
            <p class="nav-p" @click="exit">
                <el-switch
                    v-model="value"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                </el-switch>
            </p>
        </div>
        <div v-if="name === 'friends'" class="content-box">
            <div v-for="friend in friends" :key="friend.uid" class="flex" @click="getChat(friend)">
                <el-badge :value="getNum(friend.uid)" :max="99" class="item">    
                    <el-avatar shape="square" :size="50" :src="friend.avatar"></el-avatar>
                </el-badge>
                <p class="flex1">{{friend.name}}</p>
            </div>
        </div>
        <div v-if="name === 'xxx'">
            ...开发中
        </div>
        <div class="nav-bottom">
            <p v-for="(tab, index) in item" :key="index" class="nav-p" :class="{active: tab.active}" @click="tabSelect(index, tab.name)">
                <i class="el-icon-user-solid"></i>{{tab.value}}
            </p>
        </div>
    </div>
</template>


<script>
import { wsEmit, wsOn } from 'api';
import { mapActions } from 'vuex';
const item = [
    {
        value: '我的好友',
        active: true,
        icon: 'el-icon-user-solid',
        name: 'friends'
    },
    {
        value: '待开发',
        active: false,
        icon: 'el-icon-s-goods',
        name: 'xxx'
    },
]

export default {
    name: 'home',
    data() {
        return {
            item: Object.assign([], item),
            name: 'friends',
            title: window.localStorage.name,
            uid: window.localStorage.uid,
            value:''
        };
    },
    computed: {
        friends() {
            return this.$store.state.friends;
        }
    },
    created() {
        wsEmit('online', this.uid);
        this.getFriends();
    },
    methods: {
        ...mapActions([
            'getFriends'
        ]),
        getNum(uid) {
            const key = 'num' + uid;
            let num = this.getStroage(key);
            return num;
        },
        exit() {
            window.localStorage.clear();
            wsEmit('offline', this.uid)
            this.$router.push({
                name: 'login'
            });
        },
        tabSelect(index, name) {
            this.item.forEach((el, ind) => {
                if (ind === index) {
                    el.active = true;
                } else {
                    el.active = false;
                }
            });
            this.name = name;
        },
        getChat(friend) {
            this.$router.push({
                name: 'chat',
                params: friend
            })
        }
    },
};
</script>

<style lang="less">
.nav-top {
    color: #303133;
    position: fixed;
    background-color: #e2dfdf;
    top: 0;
    width: 100%;
    height: 38px;
    z-index: 2;
    .nav-p-t {
        float: left;
        margin: 8px 0 0 10px;
    }
    .nav-p {
        margin: 0;
        display: inline-block;
        margin: 5px 10px 0 0;
        float: right;
    }
}
.content-box {
    padding: 10px;
    margin-top: 38px;
    .flex {
        display: flex;
        margin-bottom: 20px;
        .flex1 {
            flex: 1;
            margin: 0 0 0 10px;
            line-height: 50px;
            border-bottom: 1px solid #ccc;
        }
    }
}
.nav-bottom {
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: #e2dfdf;
    display: flex;
    justify-content: space-around;
    .nav-p {
        flex: 1;
        text-align: center;
        margin: 0;
        height: 38px;
        line-height: 38px;
    }
    .active {
        background-color: aquamarine;
    }
}
</style>
