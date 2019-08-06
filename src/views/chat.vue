<template>
    <div>
        <div class="fix-top">
            <i class="el-icon-arrow-left" @click="goBack"></i>
            {{friend.name}}
        </div>
        <div class="content-top">
            <div class="row-msg" v-for="row in shouldShowMsg" :key="row.id">
                <p class="top-msg" 
                    :class="{fr: byme(row.fromuid), fl: !byme(row.fromuid)}">
                    <i v-if="row.loading&&byme(row.fromuid)" class="el-icon-loading"></i>
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
        this.getmsgoto();
        this.clearNum();
    },
    methods: {
        ...mapActions([
            'getShouldShowMsg'
        ]),
        ...mapMutations([
            'changeShouldShowMsg'
        ]),
        clearNum() {
            const key = 'num' + this.friend.uid;
            window.localStorage.removeItem(key);
        },
        getmsgoto() {
            this.getShouldShowMsg({
                uid: this.friend.uid //他人的uid写入即可
            });
        },
        byme(uid) {
            return  uid == this.myUid
        },
        submit() {
            if (!this.content) return;
            console.log(this.myUid,'asdasd')
            const ct = this.content;
            this.content = '';
            const sender = {
                uid: this.myUid,
                msg: ct,
                name: this.myName
            };
            this.changeShouldShowMsg({
                fromuid: this.myUid,
                avatar: this.avatar,
                msg: ct,
                loading: true,
            });
            this.autoBottom();
            post('/savemsg', {
                from: this.myUid,
                to: this.friend.uid,
                msg: ct
            }).then(({data}) => {
                if (data) {
                    this.getmsgoto();
                    // 发送私信给别人
                    wsEmit('send-private-chat', sender, this.friend.uid);
                }
            })
        },
        autoBottom() {
            window.scrollTo({ 
                top: window.screen.height + 9999, 
                behavior: "smooth" 
            });
        },
        goBack() {
            this.$router.push({
                name: 'home'
            })
            
        }
    },
};
</script>

<style lang="less">
    .fix-top {
        width: 100%;
        height: 38px;
        position: fixed;
        top: 0;
        z-index: 111;
        background-color: rgb(226, 223, 223);
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
    }
    .content-top {
        padding: 0 8px;
        margin-top: 28px;
        margin-bottom: 33px;
        .row-msg {
            overflow: hidden;
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
            padding: 5px!important;
            &:focus {
               border-color: #44b549!important;
            }
        }
        .el-button {
            height: 33px!important;
            background-color: #3ca940 !important;
            border-radius: 3px!important;
            border: none;
        }
    }
</style>
