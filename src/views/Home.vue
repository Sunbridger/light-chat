<template>
    <div class="pg-login" :style="{height:h}">
        <el-form></el-form>
    </div>
</template>
<script lang="ts">
import Vue from 'vue';
import Form from 'component/Form.vue';
export default Vue.extend({
  name: 'home',
  data() {
      return {
          h: window.innerHeight+'px'
      }
  },
  methods: {
    
  },
  created() {
      window.addEventListener('resize', () => {
          this.h = window.innerHeight+'px';
      })
  },
  components: {
      Form
  }
});
</script>

<style lang="less">
    .pg-login {
        background-color: rgba(126, 220, 130, .9);
    }
</style>

