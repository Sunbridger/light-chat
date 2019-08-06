<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

import { wsEmit, wsOn } from 'api';
export default {
    created() {
        const uid = this.getStroage('uid');
        if (uid) {
            wsEmit('online', uid);
            // 监听给我发私信的事件...
            wsOn('receive-private-chat' ,(sender) => {
                // TODO 数据库存储后期
                let oldRe = JSON.parse(this.getStroage(sender.uid) || '[]');
                oldRe.push({
                    byme: false,
                    msg: sender.msg
                });
                this.saveStroage({
                    [sender.uid]: JSON.stringify(oldRe)
                })
                this.$router.push({
                    name: 'chat',
                    params: sender
                })
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
