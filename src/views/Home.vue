<template>
    <div>
        <div v-if="name === 'friends'">
            <div v-for="friend in friends" :key="friend.uid" class="flex" @click="getChat(friend)">
                <el-avatar shape="square" :size="50" :src="friend.avatar"></el-avatar>
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
const friends = [
    {
        name: '小王八',
        uid: 21,
        avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
    },
    {
        name: '曹奥',
        uid: 127,
        avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
    },
    {
        name: '猴子啊',
        uid: 22,
        avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
    },
    {
        name: '万知啊',
        uid: 981,
        avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
    },
    {
        name: '刘阿斯',
        uid: 2321,
        avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
    },
];
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
            friends: []
        };
    },
    created() {
        this.friends = Object.assign([], friends);
    },
    methods: {
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
    .flex {
        display: flex;
        margin-bottom: 20px;
        .flex1 {
            flex: 1;
            margin: 0;
            line-height: 50px;
            border-bottom: 1px solid #ccc;
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
