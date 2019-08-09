<template>
    <div>
        <el-form ref="form" :model="form" label-width="60px">
            <el-form-item label="账号">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input type="password" v-model="form.password"></el-input>
            </el-form-item>
            <div class="cen-tip">
                <el-radio v-model="tipVoice" :label="1">声音</el-radio>
                <el-radio v-model="tipVoice" :label="0">震动</el-radio>
            </div>
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
import { mapMutations } from 'vuex';

export default {
    name: 'login',
    data() {
        return {
            form: {
                name: '', // 姓名
                password: '', // 密码
            },
            tipVoice: 1
        }
    },
    methods: {
        login() {
            if (!this.form.name.trim() || !this.form.password.trim()) {
                this.$message({
                    message: '请填写账号或密码',
                    type: 'warning',
                    duration: 700
                })
            } else {
                this.clearStorage();
                post('/login', this.form).then(({data}) => {
                    if (data.status) {
                        const { uid, avatar,name } = data;
                        const tipVoice = this.tipVoice;
                        this.saveStroage({ uid, avatar, name, tipVoice });
                        this.$router.push({
                            name: 'home',
                        });
                        location.reload();
                    } else {
                        this.$message({
                            message: data.msg,
                            type: 'error',
                            duration: 700
                        })
                    }
                })
            }
        },
        clearStorage() {
            ['avatar', 'name', 'uid', 'tipVoice'].forEach(el => {
                window.localStorage.removeItem(el);
            });
        }
    }
};
</script>

<style>
.el-form {
    padding: 35px;
}
.cen-tip {
    padding-left: 60px;
    padding-bottom: 40px;
    
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


