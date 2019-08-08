<template>
    <div 
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(220, 220, 220, 0.8)">
        <div class="nav-top">
            <p class="nav-p-t">
                欢迎您<span>{{title}}</span>
            </p>
            <p class="nav-p" @click="writeArtic">
                <i class="el-icon-circle-plus-outline"></i>
            </p>
        </div>
        <div v-if="tabName === 'friends'" class="content-box">
            <friends></friends>
        </div>
        <div v-if="tabName === 'dynamic'" class="content-box">
            <articles></articles>
        </div>
        <div class="nav-bottom">
            <p v-for="(tab, index) in item" :key="tab.value" class="nav-p" :class="{active: tab.active}" @click="tabSelect(index, tab.tabName)">
                <i :class="tab.icon"></i>{{tab.value}}
            </p>
        </div>
        <span class="upbox" @click="up">
            <i class="el-icon-upload2 "></i>
        </span>
    </div>
</template>


<script>
import { wsEmit } from 'api';
import Articles from 'component/articles.vue';
import Friends from 'component/friends.vue';

export default {
    name: 'home',
    data() {
        return {
            item: [
                {
                    value: '我的好友',
                    active: true,
                    icon: 'el-icon-user-solid',
                    tabName: 'friends'
                },{
                    value: '好友动态',
                    active: false,
                    icon: 'el-icon-s-help',
                    tabName: 'dynamic'
                }
            ],
            title: window.localStorage.name,
            uid: window.localStorage.uid,
            tabName: 'friends'
        };
    },
    computed: {
        loading() {
            return this.$store.state.loading
        }
    },
    created() {
        wsEmit('online', this.uid);
    },
    methods: {
        exit() {
            ['avatar', 'name', 'uid'].forEach(el => {
                window.localStorage.removeItem(el);
            })
            wsEmit('offline', this.uid)
            this.$router.push({
                name: 'login'
            });
        },
        writeArtic() {
            this.$router.push({
                name: 'write'
            })
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
        up() {
            window.scrollTo({ 
                top: 0, 
                behavior: "smooth" 
            });
        }
    },
    components: {
        Articles,
        Friends
    }
};
</script>

<style lang="less">
.el-loading-mask {
    position: fixed!important;
}
.nav-top {
    position: fixed;
    background-color: #e2dfdf;
    top: 0;
    width: 100%;
    height: 38px;
    z-index: 2;
    .nav-p-t {
        float: left;
        margin: 8px 0 0 10px;
        font-size: 14px;
        color: #67C23A;
    }
    .nav-p {
        margin: 0 10px 0 0;
        float: right;
        font-size: 25px;
    }
}
.content-box {
    padding: 10px 10px 38px 10px;
    margin-top: 38px;
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
        font-weight: 100;
    }
    .active {
        background-color: #67C23A;
        color: white;
    }
}
.upbox {
    display: block;
    position: fixed;
    width: 50px;
    height: 50px;
    line-height: 50px;
    bottom: 43px;
    border-radius: 50%;
    background-color: rgba(220,220,221,.5);
    right: 0;
    text-align: center;
}
</style>
