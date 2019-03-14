<template>
  <div id="app">
    <Nav></Nav>
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Nav from '@/components/Nav.vue';

@Component({
  components: { Nav }
})
export default class App extends Vue {}
</script>
<style lang="scss">
@import 'styles';

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $grayMid;
  height: 100vh;
  overflow: auto;
  background-color: $other;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: $grayMid;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

html, body {
  margin: 0;
  height: 100%;
}
</style>
