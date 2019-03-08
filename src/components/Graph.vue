<template>
  <div class="graph">
    <canvas v-bind:id="id"></canvas>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Chart } from 'chart.js';

@Component
export default class Graph extends Vue {
  
  @Prop()
  graphConfig: Chart.ChartConfiguration;

  graph: Chart | undefined = undefined;
  
  id = Math.random();

  mounted() {
    console.log('mounted!');
    var canvas = document.getElementById(`${this.id}`) as HTMLCanvasElement;
    if(canvas) {
      this.graph = new Chart(canvas.getContext('2d'), this.graphConfig);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  $accent: #666666;
  .graph {
    position: relative;
    height: 100%;
    width: 100%;
  }
  canvas {
    background-color: $accent;
  }
</style>
