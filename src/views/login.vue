<template>
    <div class="pg-login">
        <el-form ref="form" :model="form" label-width="60px">
            <el-form-item label="账号">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input type="password" v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="success" @click="login">登陆</el-button>
                <el-button type="primary">
                    <router-link :to="{name: 'register'}">注册</router-link>
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { get, post, wsEmit, wsOn } from 'api';
import Global from '../../global.js'
const serviceImg = Global + 'addimg';

export default {
    name: 'login',
    data() {
        return {
            form: {
                name: '', // 姓名
                password: '', // 密码
            }
        }
    },
    methods: {
        login() {
            if (!this.form.name.trim() || !this.form.password.trim()) {
                this.$message({
                    message: '请填写账号或密码',
                    type: 'warning',
                    duration: 1500
                })
            } else {
                post('/login', this.form).then(({data}) => {
                    if (data.status) {
                        const { uid, avatar,name } = data;
                        this.saveStroage({ uid, avatar, name });
                        this.$router.push({
                            name: 'home',
                            // params: 'ok' TODO:利用参数 保证uid的传递？
                        });
                    } else {
                        this.$message({
                            message: data.msg,
                            type: 'error',
                            duration: 1500
                        })
                    }
                })
            }
        }
    }
};
</script>

<style>
.el-form {
    padding: 35px;
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
  a {
      text-decoration: none;
      color: white;
  }
</style>


