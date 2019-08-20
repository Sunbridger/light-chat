<template>
    <div 
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(220,220,220)">
        <div class="nav-top">
            <p class="nav-p-t" @click="exit">
                <el-avatar shape="circle" :size="35" :src="myavatar"></el-avatar>
                <span class="name-color">{{title}}</span>
            </p>
            <!-- <el-dropdown trigger="click">
                kkkk
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>黄金糕</el-dropdown-item>
                    <el-dropdown-item>螺蛳粉</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown> -->
            <p class="nav-p" @click="writeArtic">
                <i class="el-icon-circle-plus-outline"></i>
            </p>
        </div>
        <div v-if="tabName === 'friends'" class="content-box">
            <friends></friends>
        </div>
        <div v-show="tabName === 'dynamic'" class="content-box">
            <articles></articles>
        </div>
        <div class="nav-bottom">
            <p v-for="(tab, index) in item" :key="tab.value" class="nav-p"  @click="tabSelect(index, tab.tabName)">
                <span :class="{active: tab.active}">
                    <i :class="tab.icon"></i>{{tab.value}}
                </span>
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
            title: '',
            uid: '',
            myavatar: '',
            tabName: 'friends'
        };
    },
    computed: {
        loading() {
            return this.$store.state.loading
        }
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            this.title = window.localStorage.name;
            this.uid = window.localStorage.uid;
            this.myavatar = window.localStorage.avatar;
            wsEmit('online', this.uid);
        },
        exit() {
            this.$alert('是否退出登陆', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                    if (action == 'confirm') {
                        ['avatar', 'name', 'uid'].forEach(el => {
                            window.localStorage.removeItem(el);
                        })
                        wsEmit('offline', this.uid)
                        this.$router.push({
                            name: 'login'
                        });        
                    }
                }
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
body {
    margin: 0;
    padding: 0;
    overscroll-behavior-y: contain;
    &::-webkit-scrollbar{
        width: 0;
        height: 0;
    }
}
.el-loading-mask {
    position: fixed!important;
}
.nav-top {
    position: fixed;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    box-sizing: border-box; 
    background-color: #f3f3f3;
    top: 0;
    width: 100%;
    height: 50px;
    z-index: 2;
    p {
        margin: 0;
    }
    .nav-p-t {
        font-size: 14px;
        color: #67C23A;
        display: flex;
        height: 35px;
        line-height: 35px;
        .name-color {
            margin-left: 5px;
        }
    }
    .nav-p {
        font-size: 25px;
    }
}
.content-box {
    padding: 10px 10px 50px 10px;
    margin-top: 50px;
    width: 100%;
    box-sizing: border-box;
}
.nav-bottom {
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: white;
    display: flex;
    justify-content: space-around;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.5);
    .nav-p {
        flex: 1;
        text-align: center;
        margin: 0;
        height: 50px;
        line-height: 50px;
        font-weight: 100;
    }
    .active {
        color: #409EFF;
    }
}
.upbox {
    display: block;
    position: fixed;
    width: 50px;
    height: 50px;
    line-height: 50px;
    bottom: 80px;
    border-radius: 50%;
    background-color: rgba(220,220,221,.5);
    right: 0;
    text-align: center;
}
</style>
