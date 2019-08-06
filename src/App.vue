<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

import { wsEmit, wsOn, post } from 'api';

import { mapActions } from 'vuex';

const friends = [
    {
        name: 'Sunbridger',
        uid: 19,
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
export default {
    created() {
        const uid = this.getStroage('uid');
        if (uid) {
            // 监听给我发私信的事件...
            wsOn('receive-private-chat' ,(sender) => {
                if (this.$route.name !== 'chat') {
                    this.$message({
                        message: `${sender.name}发来一条新消息`,
                        type: 'success',
                        duration: 1500
                    });
                    const key = 'num' + sender.uid;
                    let num = this.getStroage(key) || 0;
                    this.saveStroage({
                        [key]: ++num
                    })
                } else {
                    this.getShouldShowMsg({
                        uid: sender.uid
                    });
                    window.scrollTo({ 
                        top: window.screen.height + 9999, 
                        behavior: "smooth" 
                    });
                }
            });

        } 
    },
    methods: {
        ...mapActions([
            'getShouldShowMsg'
        ])
    }
};
</script>


<style lang="less">
    body {
        margin: 0;
        padding: 0;
        overscroll-behavior-y: contain;
    }
</style>
