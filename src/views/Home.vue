<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import { get, post } from '../api';

export default Vue.extend({
  name: 'home',
  components: {
    HelloWorld,
  },
  created() {
      post('/user', {
          id: 9
      }).then(res => {
          console.log(res, 'res')
      });
  },
});
</script>
