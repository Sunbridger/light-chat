<template lang="html">
    <div class="">
        <editor
        v-model="result"></editor>
        <input type="button" name="name" value="submit" @click="submit">
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

</style>
