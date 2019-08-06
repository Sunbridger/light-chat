<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

import { wsEmit, wsOn, post } from 'api';
export default {
    created() {
        const uid = this.getStroage('uid');
        if (uid) {
            wsEmit('online', uid);
            // 监听给我发私信的事件...
            wsOn('receive-private-chat' ,(sender) => {
                console.log(sender, '有人发信息给我')
            
            });
        } 
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
