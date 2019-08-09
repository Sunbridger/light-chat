<template>
    <div class="pg-write">
        <div class="fix-top">
            <i class="el-icon-arrow-left" @click="goBack">发表文字</i>
            
        </div>
        <div class="text-box">
           <el-input
                maxlength='1500'
                show-word-limit
                ref="textarea"
                type="textarea"
                placeholder="这一刻的想法..."
                :autosize="{ minRows: 4, maxRows: 12}"
                v-model="params.article">
            </el-input>
            <div>
                <el-upload
                    :action="serviceImg"
                    list-type="picture-card"
                    :limit="4"
                    :before-remove="delImg"
                    :before-upload="beforeAvatarUpload"
                    :on-preview="handlePictureCardPreview"
                    :on-error="handleRemoveError"
                    :on-success="successUp">
                <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="upimgs.dialogVisible">
                <img width="80%" :src="upimgs.dialogImageUrl" alt="">
                </el-dialog>
            </div>
        </div>
        <div class="bottom-box">
            <el-radio v-model="params.ispublic" :label="0">仅自己可见</el-radio>
            <el-radio v-model="params.ispublic" :label="1">公开</el-radio>
            <el-button size="medium" type="primary" @click="submit" :disabled="loading" :loading="loading">发送</el-button>
        </div>
    </div>
</template>

<script>
import {  post } from 'api';
import Global from '../../global.js';


export default {
    name: 'write',
    data() {
        const serviceImg = Global + 'addimg';
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
            loading: false,
            upimgs: {
                dialogImageUrl: '',
                dialogVisible: false,
                imgs: []
            },
            serviceImg
        }
    },
    created() {
        
    },
    mounted() {
        this.$refs.textarea.focus();
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
        tipToast(type, message, cb) {
            this.$message({
                message,
                type,
                duration: 700,
                onClose: () => {
                    cb()
                }
            });
        },
        submit() {
            let flag = this.isEmpty(this.params.user);
            if (!flag) {
                if (!this.params.article.trim()) {
                    this.$message.warning('内容为空哦～');
                    return;
                }
                this.loading = true;
                this.params.article = this.params.article.replace(/(^\s*)/g, ''); // 去除前后空格
                if (this.upimgs.imgs.length) {
                    this.upimgs.imgs = this.upimgs.imgs.map(el => el.url);
                    this.params.imgs = JSON.stringify(this.upimgs.imgs);
                }
                post('/sendArticle', {...this.params}).then(({data}) => {
                    if (data) {
                        this.tipToast('success', '发表成功快去和好友分享吧～', () => {
                            this.$router.push({
                                name: 'home'
                            })
                        })
                    } else {
                        this.loading = false
                        this.$message.error('发送失败，请重试～');
                    }
                })
            } else {
                this.tipToast('error', '当前账号异常，请重新登陆', () => {
                    this.$router.push({
                        name: 'login'
                    })
                });
            }
        },
        goBack() {
            this.$router.push({
                name: 'home'
            })
        },
        successUp(file, fileList) {
            this.upimgs.imgs.push({
                url: file.url,
                imgid: fileList.uid
            });
        },
        handleRemoveError() {
            this.$message.error('图片上传失败，请刷新重试～');
        },
        handlePictureCardPreview(file) {
            this.upimgs.dialogImageUrl = file.url;
            this.upimgs.dialogVisible = true;
        },
        delImg(el) {
            this.upimgs.imgs = this.upimgs.imgs.filter(row => row.imgid != el.uid);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === ('image/jpeg' || 'image/png' || 'image/jpg');
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG) {
                this.$message.error('只支持jpeg|png|jpg格式图片');
            }
            if (!isLt2M) {
                this.$message.error('图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        }
    },
};
</script>

<style lang="less">

.pg-write {
    font-weight: 100;
    white-space: pre-wrap; 
    word-break: break-all;
    .fix-top {
        background-color: white;
        .el-icon-arrow-left {
            font-size: 16px;
            &::before {
                font-size: 20px;
            }
        }
    }
    .text-box {
        box-sizing: border-box;
        margin: 55px 0 10px 0;
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
        .el-upload-list__item {
            width: 100%;
            margin: 0;
        }
        .el-upload--picture-card {
            width: 100%;
            height: 100%;
            margin: 0;
        }
        
    }
    .bottom-box {
        display: flex;
        margin-bottom: 10px;
        justify-content: space-around;
        .el-radio {
            line-height: 36px;
        }
    }
}
    
</style>
