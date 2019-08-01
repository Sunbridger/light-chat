<template>
  <div>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
    <input type="text" v-model="name">
    <input type="text" v-model="age">
    <button @click='submit'>提交</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import HelloWorld from 'component/HelloWorld.vue'; 
import { get, post } from '../api';

export default Vue.extend({
    name: 'home',
    data() {
        return {
            name: '',
            age:''
        }
    },
    components: {
    HelloWorld,
    },
    created() {
    
    },
    methods: {
        submit() {
            post('/user', {
                name: this.name,
                age: this.age
            }).then(({ data }) => {
                if (data.msg) {
                    console.log('成功')
                } else {
                    console.log('失败')
                }
            })
        }
    }
});
</script>
