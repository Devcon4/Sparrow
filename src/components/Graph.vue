<template>
  <div class="graph">
    <div class="wrapper">
      <canvas v-bind:id="id"></canvas>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { Chart } from 'chart.js';
import Graph from '@/models/Graph.ts';

@Component
export default class GraphComp extends Vue {
  
  @Prop({required: true})
  graphConfig: Graph;

  graph: Chart | undefined = undefined;
  
  id = Math.random();

  @Watch('graphConfig')
  draw() {
    var canvas = document.getElementById(`${this.id}`) as HTMLCanvasElement;
    if(canvas && this.graphConfig) {
      this.graph = new Chart(canvas.getContext('2d'), {...this.graphConfig.config});
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
    display: flex;
  }

  .wrapper {
    // height: 100%;
    width: 100%;
    padding: 32px;
    border-radius: 6px;
    // filter: drop-shadow(0px 4px 6px #313131);
    border-radius: 6px;
  }
  canvas {
    // position: absolute;
    
  }
</style>
