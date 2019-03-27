<template>
    <div class="overview">
        <div class="header">
            <h2>Overview</h2>
            <Tabs :tabState="tabs.range" color="blue"></Tabs>
            <div class="spacer"></div>
            <Tabs :tabState="tabs.category" :action="changeCategory"></Tabs>
            <div class="button">
                <button>DOWNLOAD EXCEL</button>
            </div>
        </div>
        <hr>
        <div class="graph">
            <div class="graph-wrapper" v-for="graph in graphs" :key="graph.code">
                <GraphComp v-if="graph.code === selectedGraph.code" v-bind:graphConfig="graph"></GraphComp>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Tabs from '../components/Tabs.vue';
import GraphComp from '../components/Graph.vue';
import { mapState, mapMutations } from 'vuex';
import ServiceProvider from '@/ServiceProvider';
import Tab from '@/models/Tab';
import { GraphTypes } from '@/models/GraphTypes';

@Component({
    components: { Tabs, GraphComp },
    computed: mapState(['tabs', 'selectedGraph', 'graphs'])
})
export default class Overview extends Vue {
    async mounted() {
        this.setTabs();
        await this.loadGraphData();
    }

    async loadGraphData() {
        let cards = await ServiceProvider.dataService.getCards();
        let customFields = await ServiceProvider.dataService.getCustomFieldDefinitions();


        let CountPerTOW = ServiceProvider.graphService.GetGraphForTOW(ServiceProvider.mapDataService.CardsGroupedByTypeOfWork(cards, customFields));
        let CountPerAgency = ServiceProvider.graphService.GetGraphForTasksPerAgency(ServiceProvider.mapDataService.CardsGroupedByAgency(cards, customFields));

        let graphs = [
            CountPerTOW,
            CountPerAgency
        ];

        this.$store.commit('setGraphList', graphs);
        this.$store.commit('setSelectedGraph', graphs[0]);
    }

    changeCategory(tab: Tab) {
        this.$store.commit('setCategoryFilter', tab);
        this.$store.dispatch('updateSelectedGraph');
    }

    setTabs() {
        this.$store.commit('setCategoryTabs', {
            activeIndex: 0,
            list: [
                {
                    name: 'Type of Work',
                    value: GraphTypes.CountPerTOW
                },
                {
                    name: 'Contract',
                    value: GraphTypes.CountPerAgency
                },
                {
                    name: 'Owner',
                    value: 'OWNER'
                },
                {
                    name: 'Status',
                    value: 'STATUS'
                }
            ]
        });

        this.$store.commit('setRangeTabs', {
            activeIndex: 0,
            list: [
                {
                    name: 'Today',
                    value: 'TODAY'
                },
                {
                    name: 'Week',
                    value: 'WEEK'
                },
                {
                    name: 'Sprint',
                    value: 'SPRINT'
                }
            ]
        });
        this.$forceUpdate();
    }    
}
</script>

<style lang="scss" scoped>
@import '../styles';

    .overview {
        display: flex;
        flex-direction: column;
        margin: 24px;
        margin-bottom: 0;
        margin-top: 30;
        margin-right: 0;
        height: calc(100% - 30px);
        // background-color: $dusk;
        // border-top-left-radius: 100px;
        // box-shadow: inset 100px 100px 600px $deepDusk;
        // filter: blur(25px);
    }

    .hidden {
        display: none;
    }

    .graph {
        height: 100%;
        overflow: hidden;
        max-height: 100%;
        max-width: 100%;
    }

    .graph-wrapper {
        // height: 100%;
        // width: 100%;
    }

    .header {
        display: flex;
        padding: 8px;

        align-items: flex-end;

        * {
            color: $purple;
        }
        
        h2 {
            margin-bottom: 0;
            margin-right: 8px;
        }

        .spacer {
            height: 1px;
            width: 100%;
        }


        button {
            color: white;
            background-color: $purple;

            border-radius: 18px;
            padding: 0;
            border-style: none;
            white-space: nowrap;
            text-align: center;
            padding: 6px 28px;
        }
    }

</style>
