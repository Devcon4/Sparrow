<template>
  <div class="home">
    <h1><router-link to="/">Sparrow Dashboard</router-link></h1>

    <div class="content">
      <div class="header">
        <img src="../../public/img/logo/logo-apple-touch-icon.png" alt="">
      </div>
      <hr class="hr-1">
      <!-- <hr class="hr-2"> -->
      <hr class="hr-3">
      <div class="main">
        <Graph class="grid-1" v-bind:graphConfig="firstConfig"></Graph>
        <Graph class="grid-2" v-bind:graphConfig="firstConfig"></Graph>
        <Graph class="grid-3" v-bind:graphConfig="firstConfig"></Graph>
        <Graph class="grid-4" v-bind:graphConfig="firstConfig"></Graph>
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
    padding: 32px;
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

  .main {
    display: grid;
    max-height: 100%;
    grid-gap: 32px;
    grid-template: 'first second' 'third fourth';
  }

  .home {
  }

  .grid-1 { grid-area: first; }
  .grid-2 { grid-area: second; }
  .grid-3 { grid-area: third; }
  .grid-4 { grid-area: fourth; }
  
</style>
<script lang="ts">

import { Component, Vue } from "vue-property-decorator";
import {Chart} from 'chart.js';
import Graph from '@/components/Graph.vue'

@Component({
  components: { Graph }
})
export default class Home extends Vue {
  get firstConfig(): Chart.ChartConfiguration {
    return {
      type: 'bar',
      data: {
          labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          datasets: [{
              label: '# of Votes',
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
        responsive: true,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
          }
      }
    }
  }
}
</script>
