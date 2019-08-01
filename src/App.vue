<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <Axios />
  </div>
</template>

<script>
import HelloWorld from 'component/HelloWorld'
import Axios from 'component/Axios'

export default {
  name: 'app',
  components: {
    HelloWorld,
    Axios
  }
}
</script>
