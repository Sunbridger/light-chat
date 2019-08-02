<template lang="html">
    <div>
        <div class="content-top">
            <div class="row-msg" v-for="(row, index) in shouldShowMsg" :key="row.msg+index">
                <p class="top-msg" :class="{fr: row.byme, fl: !row.byme}">
                    {{row.msg}}
                    <el-avatar :class="{'el-avatar-fl': !row.byme, 'el-avatar-fr': row.byme}" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
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
    data() {
        return {
            content: '',
            shouldShowMsg: [],
        };
    },
    created() {
        wsOn('newMsg' ,msg => {
            this.shouldShowMsg.push({
                byme: false,
                msg
            });
        })
    },
    methods: {
        submit() {
            console.log(this.content,'ccccc')
            if (!this.content) return;
            wsEmit('sendMsg', this.content, msg => {
                this.shouldShowMsg.push({
                    byme: true,
                    msg
                });
                this.content = '';
            });
        },
    },
};
</script>

<style lang="less">
    .content-top {
        padding: 0 8px;
        .row-msg {
            overflow: hidden;
            margin: 20px 0 10px 0;
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
                    width: 20px;
                    vertical-align: -3px;
                    margin-left: 3px;
                }
            }
        }
    }
    .box-chat {
        display: flex;
        align-items: flex-end;
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
