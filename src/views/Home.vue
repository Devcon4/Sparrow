<template>
  <div class="home">
    <!-- <h1><router-link to="/">Sparrow Dashboard</router-link></h1> -->

    <div class="content">
      <!-- <div class="header">
        <img src="../../public/img/logo/logo-apple-touch-icon.png" alt="">
      </div>
      <hr class="hr-1">
      <hr class="hr-2">
      <hr class="hr-3"> -->
      <div class="main">
        <div class="cards">
          <Card v-bind:cardInfo="cardInfo"></Card>
          <Card v-bind:cardInfo="cardInfo"></Card>
          <Card v-bind:cardInfo="cardInfo"></Card>
          <Card v-bind:cardInfo="cardInfo"></Card>
        </div>
        <div class="graphs">
          <Graph class="grid-1" v-bind:graphConfig="this.firstConfig"></Graph>
          <Graph class="grid-2" v-bind:graphConfig="firstConfig"></Graph>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  $primary: #D61A00;
  $primary-light: lighten($primary, 40%);
  $accent: #666666;
  $accent-light: lighten($accent, 40%);

  h1 {
    display: flex;
    font-size: 14px;
    background-color: $primary-light;
    margin: 0;
    padding: 12px;
    filter: drop-shadow(0px 3px 3px rgb(224, 224, 224));
    
    a {
      font-weight: bold;
      color: $primary;
    }
  }

  .content {
    padding: 24px;
    img {
      width: 100px;
      height: 100px;
    }
    
    hr {
      border-style: none;
      border-bottom: 3px solid $accent;  
    }

    .header {
      display: flex;
      justify-content: center;
    }

    .hr-1 { width: 80%; }
    .hr-2 { width: 75%; }
    .hr-3 { width: 50%; }
  }
  
  .cards {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
  }

  .graphs {
    display: grid;
    grid-gap: 24px;
    grid-template: 'first second';
  }

  .grid-1 { grid-area: first; }
  .grid-2 { grid-area: second; }
  
</style>
<script lang="ts">

import { Component, Vue } from "vue-property-decorator";
import {Chart} from 'chart.js';
import Graph from '@/components/Graph.vue'
import Card, { CardInfo } from '@/components/Card.vue';
import ServiceProvider from '@/ServiceProvider';

@Component({
  components: { Graph, Card }
})
export default class Home extends Vue {

  async mounted() {
    let cards = await ServiceProvider.dataService.getCards();
    let customFields = await ServiceProvider.dataService.getCustomFieldDefinitions();
    this.towGroup = ServiceProvider.mapDataService.CardsGroupedByTypeOfWork(cards, customFields);
    this.count = ServiceProvider.mapDataService.CardsCompletedCount(cards);

    console.log('init');
    console.log(ServiceProvider.graphService.GetGraphForTOW(this.towGroup));

    this.firstConfig = ServiceProvider.graphService.GetGraphForTOW(this.towGroup);
  }

  private _towGroup = null;
  private _count = null;
  public firstConfig = null;

  get towGroup() {
    return this._towGroup;
  }

  set towGroup(val) {
    this._towGroup = val;
  }

  get count() {
    return this._count;
  }

  set count(val) {
    this._count = val;
  }

  get cardInfo(): CardInfo {
    return {
      Title: '_'
    }
  }
}
</script>
