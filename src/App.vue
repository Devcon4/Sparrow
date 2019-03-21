<template>
  <div id="app">
    <!-- <Nav></Nav> -->
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
  color: $white;
  height: 100vh;
  overflow: auto;
  background-color: $deepDusk;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: $blue;
    &.router-link-exact-active {
      color: $purple;
    }
  }
}

html, body {
  margin: 0;
  height: 100%;
}
</style>
