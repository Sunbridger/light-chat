<template>
    <div>
        <el-input v-model="name" placeholder="请输入姓名"></el-input>
        <el-input v-model="age" placeholder="请输入年龄" type="number"></el-input>
        <el-button @click="submit" type="primary">主要按钮</el-button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { post } from '../api'
export default Vue.extend({
  data() {
      return {
          name: '',
          age: ''
      }
  },
  methods: {
      submit() {
          post('/adduser', {
              name: this.name,
              age: this.age
          }).then(({ data }) => {
              if (data.msg) {
                  console.log('ok')
              } else {
                  console.log('false')
              }
          })
      }
  }
});
</script>
