<template lang="html">
    <div class="box-chat">
        <editor
        v-model="result"></editor>
        <el-button type="success" round @click="submit">发送</el-button>
    </div>
</template>

<script>
import Editor from 'component/Editor.vue';

export default {
  name: 'e',
  data() {
    return {
      result: '',
    };
  },
  methods: {
    submit() {
      console.log(this.result);
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
</style>
