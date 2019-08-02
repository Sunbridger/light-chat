<template lang="html">
    <div>
        <div>
            <div class="top-msg" v-for="(msg, index) in hasSendMsg" :key="msg+index" v-html="msg"></div>
            <div class="top-msg" v-for="(msg, index) in hasReceiveMsg" :key="msg+index" v-html="msg"></div>
        </div>
        <div class="box-chat">
            <editor
            v-model="result"></editor>
            <el-button type="success" round @click="submit">发送</el-button>
        </div>
    </div>
</template>

<script>
import Editor from 'component/Editor.vue';
import { wsEmit, wsOn } from 'api';

export default {
  name: 'e',
  data() {
    return {
      result: '',
      hasSendMsg: [],
      hasReceiveMsg: [],
      input: ''
    };
  },
  created() {
      wsOn('newMsg' ,data => {
          this.hasReceiveMsg.push(data);
      })
  },
  methods: {
    submit() {
        if (!this.result) return;
      wsEmit('sendMsg', this.result, fromServiceData => {
          this.hasSendMsg.push(fromServiceData);
          this.result = '';
      });
    },
  },
  components: {
    Editor,
  },
};
</script>

<style lang="less">
    .box-chat {
        position: relative;
        .el-button {
            position: absolute;
            top: 5px;
            right: 5px;
        }
    }
    .top-msg {
        padding: 1px;
        img {
            width: 20px;
            vertical-align: -3px;
            margin-left: 3px;
        }
    }
</style>
