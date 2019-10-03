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
                const keychat = this.uid + '=>' + sender.uid; // 聊天记录的本地标识
                let msgArr = [];
                if (this.getStroage(keychat)) {
                    let oldMsgArr = JSON.parse(this.getStroage(keychat));
                    msgArr = [
                        ...oldMsgArr,
                        {
                            msg: sender.msg,
                            time: new Date(),
                            fromuid: sender.uid
                        }
                    ];
                } else {
                    msgArr.push({
                        msg: sender.msg,
                        time: new Date(),
                        fromuid: sender.uid
                    });
                }
                if (this.$route.name !== 'chat') {
                    const key = this.uid + '-' + sender.uid; // 前后端标志uid 用来标识未读信息的数量
                    let num = this.getStroage(key) || 0;
                    const h = this.$createElement;
                    this.msg = this.$message({
                        message: h('span' , { on: { click: this.goChat }}, `${sender.name}发来一条新消息`),
                        type: 'success'
                    });
                    this.saveStroage({
                        [key]: ++num, 
                        [keychat]: JSON.stringify(msgArr)
                    });
                } else {
                    // 数据库获取数据
                    // this.getShouldShowMsg({
                    //     uid1: this.uid,
                    //     uid2: sender.uid,
                    // });
                    // 本地缓存获取数据
                    this.saveStroage({
                        [keychat]: JSON.stringify(msgArr)
                    });
                    this.getShouldShowMsgFromLocal(keychat);
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
        ...mapMutations([
            'getShouldShowMsgFromLocal'
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
