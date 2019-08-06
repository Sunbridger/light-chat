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
            name: 'friends'
        };
    },
    computed: {
        friends() {
            return this.$store.state.friends;
        }
    },
    created() {
        this.getFriends();
    },
    methods: {
        ...mapActions([
            'getFriends'
        ]),
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
