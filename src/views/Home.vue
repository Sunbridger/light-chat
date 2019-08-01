<template>
  <div>
      ...
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { get, post } from '../api';

export default Vue.extend({
  name: 'home',
  methods: {
    submit() {
      post('/user', {
        name: this.name,
        age: this.age,
      }).then(({ data }) => {
        if (data.msg) {
          console.log('成功');
        } else {
          console.log('失败');
        }
      });
    },
  },
});
</script>
