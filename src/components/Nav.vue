<template>
  <div class="nav gradient-background special">
      <router-link to="/">Dashboard</router-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class Nav extends Vue {
  mounted() {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../styles';

    .nav {
        display: flex;
        padding: 12px;
        // background-color: $otherLight;

        a {
            color: black;
        }
    }

</style>
