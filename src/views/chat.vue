<template>
    <div>
        <div class="fix-top">
            <i class="el-icon-arrow-left" @click="goBack"></i>
            {{friend.name}}
        </div>
        <div class="content-top">
            <div class="row-msg" v-for="(row, index) in shouldShowMsg" :key="row.msg+index">
                <p class="top-msg" 
                    :class="{fr: row.byme, fl: !row.byme}">
                    {{row.msg}}
                    <el-avatar 
                        :class="{'el-avatar-fl': !row.byme, 'el-avatar-fr': row.byme}" 
                        :src="row.byme?myAvatar:friend.avatar">
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
import { wsEmit, wsOn } from 'api';
export default {
    name: 'chat',
    data() {
        return {
            content: '',
            shouldShowMsg: JSON.parse(this.getStroage(this.$route.params.uid) || '[]'),
            friend: this.$route.params,
            myAvatar: this.getStroage('avatar'),
            myName: this.getStroage('name'),
            myUid: this.getStroage('uid')
        };
    },
    created() {
        console.log(this.shouldShowMsg, 'shouldShowMsg')
        wsOn('newMsg' ,msg => {
            this.shouldShowMsg.push({
                byme: false,
                msg
            });
            this.autoBottom();
        });
    },
    methods: {
        submit() {
            if (!this.content) return;
            const sender = {
                name: this.myName,
                avatar: this.myAvatar,
                uid: this.myUid,
                msg: this.content
            };
            wsEmit('send-private-chat', sender, this.friend.uid);
            this.shouldShowMsg.push({
                byme: true,
                msg: this.content
            });
            this.content = '';
            this.autoBottom();
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
        height: 28px;
        position: fixed;
        top: 0;
        z-index: 111;
        background-color: rgb(226, 223, 223);
        text-align: center;
        line-height: 28px;
        .el-icon-arrow-left {
            position: absolute;
            left: 2px;
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
            }
            .fl {
                float: left;
                margin-left: 40px;
            }
            .top-msg {
                line-height: 1.5;
                min-height: 25px;
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
