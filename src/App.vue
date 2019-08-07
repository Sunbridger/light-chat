<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

import { wsEmit, wsOn, post } from 'api';

import { mapActions, mapMutations } from 'vuex';

export default {
    data() {
        return {
            audioCtx: new AudioContext()
        }
    },
    created() {
        const uid = window.localStorage.uid;
        if (uid) {
            // 监听给我发私信的事件...
            wsOn('receive-private-chat' ,(sender) => {
                this.audioTip()
                
                if (this.$route.name !== 'chat') {
                    const key = uid + '-' + sender.uid;
                    let num = this.getStroage(key) || 0;
                    if (!num) {
                        this.saveStroage({
                            [key]: ++num
                        });
                        location.reload(); 
                    } else {
                        this.$message({
                            message: `${sender.name}发来一条新消息`,
                            type: 'success'
                        })
                    }
                    // this.saveStroage({
                    //     [key]: ++num
                    // });
                } else {
                    this.getShouldShowMsg({
                        uid1: uid,
                        uid2: sender.uid,
                    });
                    window.scrollTo({ 
                        top: window.screen.height + 9999, 
                        behavior: "smooth" 
                    });
                }
            });

        } 
    },
    computed: {
        
    },
    methods: {
        ...mapActions([
            'getShouldShowMsg'
        ]),
        audioTip() {
            // 创建音频上下文  
            var audioCtx = this.audioCtx;
            // 创建音调控制对象  
            var oscillator = audioCtx.createOscillator();
            // 创建音量控制对象  
            var gainNode = audioCtx.createGain();
            // 音调音量关联  
            oscillator.connect(gainNode);
            // 音量和设备关联  
            gainNode.connect(audioCtx.destination);
            // 音调类型指定为正弦波  
            oscillator.type = 'sine';
            // 设置音调频率  
            oscillator.frequency.value = 600.00;
            // 先把当前音量设为0  
            gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
            // 0.01秒时间内音量从刚刚的0变成1，线性变化 
            gainNode.gain.linearRampToValueAtTime(2, audioCtx.currentTime + 0.01);
            // 声音走起 
            oscillator.start(audioCtx.currentTime);
            // 1秒时间内音量从刚刚的1变成0.001，指数变化 
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1);
            // 1秒后停止声音 
            oscillator.stop(audioCtx.currentTime + 1);
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
