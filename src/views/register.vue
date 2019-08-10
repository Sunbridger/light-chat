<template>
    <div class="pg-form">
        <el-form ref="form" :model="form" label-width="60px" :rules="rules">
            <el-form-item label="账号" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item class="ava" label="头像">
                <el-upload
                    class="avatar-uploader"
                    :action="serviceImg"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="urlImg" :src="urlImg" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <el-button v-if="!searching" class="randomava" icon="el-icon-search" @click="randomAva" circle></el-button>
                <span class="el-icon-loading randomava" v-else></span>
            </el-form-item>
            <el-form-item>
                <el-button
                    type="primary"
                    v-loading.fullscreen.lock="fullscreenLoading"
                    @click="onRegister('form')" plain>提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { get, post }  from 'api';
import axios from 'api';
import Global from '../../global.js'
const serviceImg = Global + 'addimg';

export default {
    name: 'register',
    data() {
        return {
            form: {
                name: '', // 姓名
                password: '', // 密码
                avatar: '', // 头像
            },
            rules: {
                name: [
                    { required: true, message: '请输入账号名称', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ]
            },
            urlImg: '',
            fullscreenLoading: false,
            serviceImg,
            searching: false
        }
    },
    methods: {
        onRegister(ref) {
            this.$refs[ref].validate(valid => {
                if (valid && this.urlImg) {
                    this.registerFn();
                } else {
                    let message = '请按要求填写信息';
                    if (!this.urlImg) {
                        message = '请上传头像或随机生成'
                    }
                    this.$message({
                        message,
                        type: 'warning',
                        duration: 1000
                    });
                }
            })
        },
        registerFn() {
            this.form.avatar = this.urlImg;
            post('/register', this.form).then(({data}) => {
                this.fullscreenLoading = false;
                if (data.msg) {
                    this.$message({
                        message: '注册成功',
                        type: 'success',
                        duration: 450
                    });
                    this.$router.push({
                        name: 'login'
                    })

                } else {
                    this.$message({
                        message: '用户名已存在',
                        type: 'error',
                        duration: 1500
                    });
                }
            })
        },
        handleAvatarSuccess(res, file) {
            this.urlImg = URL.createObjectURL(file.raw); //迅速展示前端👮‍
        },
        beforeAvatarUpload(file) {
            console.log(file.type)
            const isImg = (file.type === 'image/png' || file.type === 'image/jpeg');
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isImg) {
                this.$message.error('只支持jpeg|png|jpg格式图片');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isImg && isLt2M;
        },
        randomAva() {
            this.searching = true;
            axios.get('https://api.uomg.com/api/rand.avatar?format=json').then(({data}) => {
                this.searching = false;
                if (data.msg) {
                    this.$message.error(data.msg);
                } else {
                    this.urlImg = data.imgurl;
                }
            })
        }
    }
};
</script>

<style>
.el-form {
    padding: 35px;
}
.randomava{
    position: absolute;
    top: 6px;
    left: 70px;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 50px;
    height: 50px;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 50px;
    height: 50px;
    display: block;
  }
  .el-message {
      min-width: 80%!important;
  }
  .el-icon-plus {
      width: 50px;
      height: 50px;
      padding-top: 10px;
  }
</style>
