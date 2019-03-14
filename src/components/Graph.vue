<template>
  <div class="graph">
    <canvas v-bind:id="id"></canvas>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { Chart } from 'chart.js';

@Component
export default class Graph extends Vue {
  
  @Prop({required: true})
  graphConfig: Chart.ChartConfiguration;

  graph: Chart | undefined = undefined;
  
  id = Math.random();

  @Watch('graphConfig', {immediate: true})
  draw() {
    var canvas = document.getElementById(`${this.id}`) as HTMLCanvasElement;
    if(canvas) {
      this.graph = new Chart(canvas.getContext('2d'), this.graphConfig);
    }
  }

  mounted() {
    this.draw();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import '../styles';

  .graph {
    padding: 32px;
    border-radius: 6px;
    // filter: drop-shadow(0px 4px 6px #313131);
    background-color: $otherLight;
    border-radius: 6px;
  }
  canvas {
    // position: absolute;
    
  }
</style>
