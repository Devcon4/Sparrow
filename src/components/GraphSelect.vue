<template>
  <div>
    <!-- <md-tabs>
      <md-tab id="tab-completed" md-label="Completed">
        <Graph v-bind:graphConfig="this.firstConfig"></Graph>
      </md-tab>
      <md-tab id="tab-agency" md-label="Per Agency">
        <Graph v-bind:graphConfig="this.secondConfig"></Graph>
      </md-tab>
    </md-tabs> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import ServiceProvider from '@/ServiceProvider';
import Graph from '@/components/Graph.vue';

@Component({
  name: 'graph-select',
  components: { Graph }
})
export default class GraphSelect extends Vue {

  @Prop()
  private cards = [];

  @Prop()
  private customFields = [];

  private count = null;
  private towGroup = null;
  private agencyGroup = null;
  public firstConfig = null;
  public secondConfig = null;

  mounted() {
    this.towGroup = ServiceProvider.mapDataService.CardsGroupedByTypeOfWork({arr: this.cards, codes: this.customFields});
    this.agencyGroup = ServiceProvider.mapDataService.CardsGroupedByAgency({arr: this.cards, codes: this.customFields});
    this.count = ServiceProvider.mapDataService.CardsCompletedCount({arr: this.cards});

    console.log('init');
    console.log(this.towGroup);
    this.firstConfig = ServiceProvider.graphService.GetGraphForTOW(this.towGroup);
    this.secondConfig = ServiceProvider.graphService.GetGraphForTasksPerAgency(this.agencyGroup);
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
