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
          <Card v-bind:cardInfo="cardInfo()"></Card>
          <Card v-bind:cardInfo="cardInfo()"></Card>
          <Card v-bind:cardInfo="cardInfo()"></Card>
          <Card v-bind:cardInfo="cardInfo()"></Card>
        </div>
        <div class="graphs">
          <div class="grid-1">
            <graph-select v-bind:cards="cards" v-bind:customFields="customFields"></graph-select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  @import '../styles';

  h1 {
    display: flex;
    font-size: 14px;
    background-color: $black;
    margin: 0;
    padding: 12px;
    filter: drop-shadow(0px 3px 3px rgb(224, 224, 224));
    
    a {
      font-weight: bold;
      color: $grayLight;
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
      border-bottom: 3px solid $grayLight;  
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
    grid-template: 'first' 'second';
  }

  .grid-1 { grid-area: first; }
  .grid-2 { grid-area: second; }
  
</style>
<script lang="ts">

import { Component, Vue } from "vue-property-decorator";
import {Chart} from 'chart.js';
import Card, { CardInfo } from '@/components/Card.vue';
import ServiceProvider from '@/ServiceProvider';
import GraphSelect from '@/components/GraphSelect.vue'


@Component({
  components: { GraphSelect, Card }
})
export default class Home extends Vue {

  private _cards = [];
  private _customFields = [];

  public get cards() { return this._cards; }
  public set cards(val) { this._cards = val; }
  public get customFields() { return this._customFields; }
  public set customFields(val) { this._customFields = val; }
  
  async mounted() {

  }

  cardInfo(): CardInfo {
    return {
      Title: '_',
      Color: ['blue', 'green', 'purple', 'yellow'][Math.ceil(Math.random()*3)]
    }
  }
}
</script>
