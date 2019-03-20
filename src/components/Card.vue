<template>
<!-- v-bind:class="cardInfo.Color" -->
  <div class="card">
      <h1>{{cardInfo.Title}}</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

export type CardInfo = { Title: string, Color: string };

@Component
export default class Card extends Vue {
  
  @Prop()
  cardInfo: CardInfo;

  mounted() {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import '../styles';

  .card {
    width: 100%;
    margin: 12px;
    margin-top: 0px;
    border-radius: 6px;

    background-color: $otherLight;
    // filter: drop-shadow(0px 4px 6px #313131);

    &:first-child {
        margin-left: 0px;
    }

    &:last-child {
        margin-right: 0px;
    }
  }

</style>
