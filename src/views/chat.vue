<template>
    <div>
        <div class="fix-top">
            <i class="el-icon-arrow-left" @click="goBack"></i>
            {{friend.name}}
        </div>
        <div class="content-top">
            <div class="row-msg" v-for="row in shouldShowMsg" :key="row.id">
                <center>{{row.time | format}}</center>
                <p class="top-msg" 
                    :class="{fr: byme(row.fromuid), fl: !byme(row.fromuid)}">
                    <!-- <i v-if="row.loading&&byme(row.fromuid)" class="el-icon-loading"></i> -->
                    {{row.msg}}
                    <el-avatar 
                        :class="{'el-avatar-fl': !byme(row.fromuid), 'el-avatar-fr': byme(row.fromuid)}" 
                        :src="byme(row.fromuid)?myAvatar:friend.avatar">
                    </el-avatar>
                </p>
            </div>
        </div>
        <div class="box-chat">
           <el-input
                maxlength='1500'
                @focus="autoBottom"
                ref="chatinput"
                type="textarea"
                :autosize="{ minRows: 1, maxRows: 4}"
                v-model="content">
            </el-input>
            <el-button size="small" type="success" round @click="submit">发送</el-button>
        </div>
    </div>
</template>

<script>
import { wsEmit, wsOn, post } from 'api';
import { mapActions, mapMutations } from 'vuex';
export default {
    name: 'chat',
    data() {
        return {
            content: '',
            friend: this.$route.params,
            myAvatar: this.getStroage('avatar'),
            myName: this.getStroage('name'),
            myUid: this.getStroage('uid')
        };
    },
    computed: {
        shouldShowMsg() {
            return this.$store.state.shouldShowMsg
        }
    },
    created() {
        this.init();
    },
    methods: {
        // ...mapActions([
        //     'getShouldShowMsg'
        // ]),
        ...mapMutations([
            'changeShouldShowMsg',
            'shouldShowMsgClear',
            'getShouldShowMsgFromLocal'
        ]),
        init() {
            this.shouldShowMsgClear();
            this.getmsgoto();
            this.clearNum();
            setTimeout(this.autoBottom, 500)
        },
        clearNum() {
            const key = this.myUid + '-' + this.friend.uid;
            window.localStorage.removeItem(key);
        },
        getmsgoto() {
            // this.getShouldShowMsg({
            //     uid1: this.myUid,
            //     uid2: this.friend.uid 
            // });
            this.getShouldShowMsgFromLocal(this.myUid + '=>' + this.friend.uid);
        },
        byme(uid) {
            return  uid == this.myUid
        },
        submit() {
            this.$refs.chatinput.focus();
            if (!this.content) return;
            const ct = this.content;
            this.content = '';
            const sender = {
                uid: this.myUid,
                msg: ct,
                name: this.myName,
                avatar: this.myAvatar
            };
            this.changeShouldShowMsg({
                fromuid: this.myUid,
                avatar: this.avatar,
                msg: ct,
                loading: true,
            });
            const keychat = this.myUid + '=>' + this.friend.uid;
            let msgArr = [];
            if (this.getStroage(keychat)) {
                let oldMsgArr = JSON.parse(this.getStroage(keychat));
                    msgArr = [
                        ...oldMsgArr,
                        {
                            msg: ct,
                            time: new Date(),
                            fromuid: this.myUid,
                            loading: true
                        }
                    ];
            } else {
                msgArr.push({
                    msg: ct,
                    time: new Date(),
                    fromuid: this.myUid,
                    loading: true
                });
            }
            this.saveStroage({
                [keychat]: JSON.stringify(msgArr)
            });
            wsEmit('send-private-chat', sender, this.friend.uid);
            // post('/savemsg', {
            //     from: this.myUid,
            //     to: this.friend.uid,
            //     msg: ct
            // }).then(({data}) => {
            //     if (data) {
            //         this.getmsgoto();
            //         // 发送私信给别人
            //         wsEmit('send-private-chat', sender, this.friend.uid);
            //     }
            // })
        },
        autoBottom() {
            window.scrollTo(0, document.body.offsetHeight)
        },
        goBack() {
            this.$router.push({
                name: 'home'
            })
            
        }
    },
    filters: {
        format(date) {
            let dateTimeStamp = Date.parse(date);
            let result;
            let minute = 1000 * 60;
            let hour = minute * 60;
            let day = hour * 24;
            let halfamonth = day * 15;
            let month = day * 30;
            let now = new Date().getTime();
            let diffValue = now - dateTimeStamp;
            if (diffValue < 0) return;
            let monthC = diffValue/month;
            let weekC = diffValue/(7*day);
            let dayC = diffValue/day;
            let hourC = diffValue/hour;
            let minC = diffValue/minute;
            if (monthC >= 1) {
                if (monthC <= 12) {
                    result = parseInt(monthC) + '月前';
                }
                else{
                    result = parseInt(monthC/12) + '年前';
                }
            }
            else if (weekC >= 1) {
                result = parseInt(weekC) + '周前';
            }
            else if (dayC >= 1) {
                result = parseInt(dayC) +' 天前';
            }
            else if (hourC>=1){
                result = parseInt(hourC) + '小时前';
            }
            else if (minC>=1){
                result = parseInt(minC) + '分钟前';
            } else {
                result = '刚刚';
            }
            return result;
        }
    }
    
};
</script>

<style lang="less">
    .fix-top {
        width: 100%;
        height: 38px;
        position: fixed;
        top: 0;
        z-index: 111;
        background-color: #f3f3f3;
        text-align: center;
        line-height: 38px;
        .el-icon-arrow-left {
            position: absolute;
            left: 2px;
            top: 5px;
            &::before {
                font-size: 28px;
            }
        }
        .el-icon-more {
            position: absolute;
            right: 10px;
            top: 10px;
        }
    }
    .content-top {
        padding: 0 8px;
        margin-top: 38px;
        margin-bottom: 100px;
        .row-msg {
            overflow: hidden;
            center {
                color: #909399;
            }
            .fr {
                float: right;
                margin-right: 40px;
                .el-icon-loading {
                    position: absolute;
                    left: -23px;
                    top: 7px;
                }
            }
            .fl {
                float: left;
                margin-left: 40px;
            }
            .top-msg {
                line-height: 1.5;
                min-height: 25px;
                max-width: 70%;
                display: inline-block;
                padding: 2px 8px;
                border-radius:5px;
                background-color: rgba(126, 220, 130,.9);
                white-space:normal; 
                word-break:break-all;
                letter-spacing: 1px;
                position: relative;
                .el-avatar--circle {
                    position: absolute;
                    width: 30px;
                    height: 30px;
                    top: 0;
                }
                .el-avatar-fl {
                    left: -40px;
                }
                .el-avatar-fr {
                    right: -40px;
                }
                img {
                    width: 30px;
                    height: 30px;
                    vertical-align: -3px;
                }
            }
        }
    }
    .box-chat {
        display: flex;
        align-items: flex-end;
        width: 100%;
        position: fixed;
        bottom: 0;
        .el-textarea__inner {
            resize: none;
            padding: 7px!important;
            min-height: 40px!important;
            font-size: 16px;
            &:focus {
               border-color: #44b549!important;
            }
        }
        .el-button {
            height: 40px!important;
            background-color: #3ca940 !important;
            border-radius: 3px!important;
            border: none;
        }
    }
</style>
