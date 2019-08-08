<template>
    <div class="pg-write">
        <div class="fix-top">
            <i class="el-icon-arrow-left" @click="goBack"></i>
        </div>
        <div class="tip-top">有什么新鲜事想告诉大家<em>？</em></div>
        <div class="text-box">
           <el-input
                type="textarea"
                placeholder="在此输入内容吧"
                :autosize="{ minRows: 4, maxRows: 12}"
                v-model="params.article">
            </el-input>
        </div>
        <div class="bottom-box">
            <el-radio v-model="params.ispublic" :label="0">仅自己可见</el-radio>
            <el-radio v-model="params.ispublic" :label="1">公开</el-radio>
            <el-button size="medium" type="primary" @click="submit" :loading="loading">发送</el-button>
        </div>
        {{params.article}}
    </div>
</template>

<script>
import {  post } from 'api';
// import Global from '../../global.js';
// const serviceImg = Global + 'addimg';

export default {
    name: 'write',
    data() {
        return {
            params: {
                article: '',
                ispublic: 1,
                user: {
                    uid: window.localStorage.uid,
                    name: window.localStorage.name,
                    avatar: window.localStorage.avatar
                }
            },
            loading: false
        }
    },
    created() {

    },
    methods: {
        isEmpty(obj) {
            let flag = false;
            for (let key in obj) {
                if (!obj[key]) {
                    flag = true;
                    break;
                }
            }
            return flag;
        },
        tipToast(type, message) {
            this.$message({
                message,
                type
            });
        },
        submit() {
            let flag = this.isEmpty(this.params.user);
            if (!flag) {
                if (!this.params.article.trim()) {
                    this.tipToast('warning', '内容不能为空哦')
                    return;
                }
                this.loading = true;
                // this.params.article = this.params.article.replace(/(^\s*)|(\s*$)/g, ''); // 去除前后空格
                post('/sendArticle', {...this.params}).then(({data}) => {
                    this.loading = false
                    if (data) {
                        this.$router.push({
                            name: 'home'
                        })
                    }
                })
            } else {
                this.$message.error('当前账号异常，请重新登陆');
                setTimeout(() => {
                    this.$router.push({
                        name: 'login'
                    })
                },500)
            }
        },
        goBack() {
            this.$router.push({
                name: 'home'
            })
        }
    }
};
</script>

<style lang="less">

.pg-write {
    font-weight: 100;
    white-space: pre-wrap; 
    word-break: break-all;
    .fix-top {
        background-color: white;
    }
    .tip-top {
        text-align: center;
        color: #303133;
        margin-top: 38px;
    }
    .text-box {
        box-sizing: border-box;
        margin: 15px 0 5px 0;
        padding: 0 10px 0 10px;
        .el-textarea {
            border: 1px solid #DCDFE6;
            padding: 10px;
            box-sizing: border-box;
            .el-textarea__inner {
                border: none;
                resize: none;
                padding: 0;

            }
        }
        
    }
    .bottom-box {
        display: flex;
        justify-content: space-around;
        .el-radio {
            line-height: 36px;
        }
    }
}
    
</style>
