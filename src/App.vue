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
            audioCtx: new AudioContext(),
            uid: '',
            tipVoice: '',
            sender: {},
            msg: '',
        }
    },
    created() {
        this.tipVoice = window.localStorage.tipVoice;
        this.uid = window.localStorage.uid;
        if (this.uid) {
            // 监听给我发私信的事件...
            wsOn('receive-private-chat' ,(sender) => {
                this.sender = sender;
                if (this.tipVoice == '0') {
                    navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
                    navigator.vibrate(1000);
                } else {
                    this.audioTip();
                }
                if (this.$route.name !== 'chat') {
                    const key = this.uid + '-' + sender.uid;
                    let num = this.getStroage(key) || 0;
                    const h = this.$createElement;
                    this.msg = this.$message({
                        message: h('span' , { on: { click: this.goChat }}, `${sender.name}发来一条新消息`),
                        type: 'success'
                    });
                    this.saveStroage({
                        [key]: ++num
                    });
                } else {
                    this.getShouldShowMsg({
                        uid1: this.uid,
                        uid2: sender.uid,
                    });
                    window.scrollTo(0, document.body.offsetHeight)
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
        goChat() {
            this.$router.push({
                name: 'chat',
                params: this.sender
            })
            this.msg.close()
        },
        audioTip() {
            var audioCtx = this.audioCtx;
            var oscillator = audioCtx.createOscillator();
            var gainNode = audioCtx.createGain();
            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            oscillator.type = 'sine';
            oscillator.frequency.value = 600.00;
            gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
            gainNode.gain.linearRampToValueAtTime(2, audioCtx.currentTime + 0.01);
            oscillator.start(audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1);
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
        &::-webkit-scrollbar{
            width: 0;
            height: 0;
        }
    }
</style>
