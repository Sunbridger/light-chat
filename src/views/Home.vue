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
        <div v-if="tabName === 'friends'" class="content-box">
            <div v-for="friend in friends" :key="friend.uid" class="flex" @click="getChat(friend)">
                <el-badge :value="getNum(friend.uid)" :max="99" class="item">    
                    <el-avatar shape="square" :size="50" :src="friend.avatar"></el-avatar>
                </el-badge>
                <p class="flex1">{{friend.name}}</p>
                <p v-if="onlineFn(friend.uid)" class="font-grenn">在线</p>
                <p v-else class="font-red">离线</p>
            </div>
        </div>
        <div v-if="tabName === 'xxx'">
            ...开发中
        </div>
        <div class="nav-bottom">
            <p v-for="(tab, index) in item" :key="index" class="nav-p" :class="{active: tab.active}" @click="tabSelect(index, tab.tabName)">
                <i class="el-icon-user-solid"></i>{{tab.value}}
            </p>
        </div>
    </div>
</template>


<script>
import { wsEmit, wsOn, post } from 'api';
import { mapActions, mapGetters } from 'vuex';
const item = [
    {
        value: '我的好友',
        active: true,
        icon: 'el-icon-user-solid',
        tabName: 'friends'
    },
    {
        value: '待开发',
        active: false,
        icon: 'el-icon-upload',
        tabName: 'xxx'
    },
]

export default {
    name: 'home',
    data() {
        return {
            item: Object.assign([], item),
            tabName: 'friends',
            value:'',
            onlineFriends: [],
            uid: window.localStorage.uid,
            title: window.localStorage.name
        };
    },
    computed: {
        friends() {
            return this.$store.state.friends;
        }
    },
    created() {
        wsEmit('online', this.uid);
        this.getFriends({uid: this.uid});
        this.getWhoOnline();
    },
    methods: {
        ...mapActions([
            'getFriends',
        ]),
        getNum(uid) {
            const key = this.uid + '-' + uid;
            let num = this.getStroage(key);
            return num;
        },
        getWhoOnline() {
            post('/whoOnline', {uid: this.uid}).then(({data}) => {
                this.onlineFriends = data;
            })
        },
        exit() {
            ['avatar', 'name', 'uid'].forEach(el => {
                window.localStorage.removeItem(el);
            })
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
            this.tabName = name;
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
        .font-red {
            color: #909399;
        }
        .font-grenn {
            color: #67C23A;
        }
    }
}
.nav-bottom {
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: #DCDFE6;
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
        background-color: #409EFF;
    }
}
</style>
