<template>
  <div class="nav">
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
    $accent: #666666;
    $primary: #D61A00;

    .nav {
        display: flex;
        padding: 12px;
        background-color: $accent;
        filter: drop-shadow(0px 3px 6px #313131);

        a {
            color: darken($accent, 20%);
        }
    }

</style>
