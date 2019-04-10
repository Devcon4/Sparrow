<template>
    <div class="overview">
        <div class="header">
            <h2>Overview</h2>
            <div class="spacer"></div>
            <Tabs v-if="!!categoryTabs" :tabState="categoryTabs" :action="changeCategory"></Tabs>
            <div class="button">
                <button v-on:click="download()">DOWNLOAD EXCEL</button>
            </div>
        </div>
        <hr>
        <div class="graph">
            <div class="graph-wrapper" :style="{display: graph.code === selectedGraph.code ? 'block': 'none'}" v-for="graph in graphs" :key="graph.code">
                <GraphComp v-if="graph.code === selectedGraph.code" v-bind:graphConfig="graph"></GraphComp>
            </div>
        </div>
        <div class="data-tiles">
            <DataTile v-for="card in cards" :key="card.id" :card="card"></DataTile>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Tabs from '../components/Tabs.vue';
import GraphComp from '../components/Graph.vue';
import DataTile from '../components/DataTile.vue';
import { mapState, mapMutations, Store } from 'vuex';
import ServiceProvider from '@/ServiceProvider';
import Tab from '@/models/Tab';
import { GraphTypes } from '@/models/GraphTypes';
import { State } from '../store';

@Component({
    
    components: { Tabs, GraphComp, DataTile },
    computed: mapState(['categoryTabs', 'cards', 'selectedGraph', 'graphs'])
})
export default class Overview extends Vue {
    async mounted() {
        await this.loadGraphData();
    }

    async loadGraphData() {
        let cards = await ServiceProvider.dataService.getCards();
        let customFields = await ServiceProvider.dataService.getCustomFieldDefinitions();
        let members = await ServiceProvider.dataService.getBoardMembers();

        let tabs = [
            {
                name: 'Type of Work',
                value: GraphTypes.CountPerTOW
            },
            {
                name: 'Contract',
                value: GraphTypes.CountPerAgency
            }
        ];

        this.$store.commit('setCategoryTabs', { activeIndex: 0, list: tabs});
        this.$store.commit('setMemberList', members);
        this.$store.commit('setCodeList', customFields);
        this.$store.commit('setCardList', ServiceProvider.mapDataService.CardsToDataTile({arr: cards, codes: customFields, members: members}));
        this.$store.commit('setSprintList', ServiceProvider.mapDataService.SprintListFromCustomData({codes: customFields}));
        this.$store.commit('setCardRawList', cards);
        this.$store.dispatch('updateAllGraphs');

    }

    changeCategory(tab: Tab) {
        this.$store.commit('setCategoryFilter', tab);
        this.$store.dispatch('updateSelectedGraph');
    }

    download() {
        let s = (this.$store as Store<State>);
        let data = [];

        data.push({name: 'Cards', data: s.state.cardsRaw});
        data.push({name: 'Members', data: s.state.members});
        data.push({name: 'Custom Field Codes', data: s.state.codes.filter(c => !c.options)});

        // We want to normalize codes by their options so they are easier to use in excel.
        // We also want to spread each list code type into its own sheet (non list codes all get dumped to the codes sheet).
        // For each item look over its options. push that option to a normalized array.
        // We spread all properties of the option to the code obj but to avoid name conflicts we prepend 'option_' to each prop.
        s.state.codes.filter(c => !!c.options).forEach((c, ci) => {
            let codes = [];
            c.options.forEach((o, oi) => {
                let nO = {};
                let keys = Object.keys(o);
                keys.forEach(k => {
                    nO['option_'+k] = o[k];
                });
                codes.push({...c, ...nO});
            });
            data.push({name: c.name.replace(/[\/?*\[\]] /, ''), data: codes});
        });

        console.log(data);

        let mapped = ServiceProvider.excelService.MapJsonToXLSX(data);
        ServiceProvider.excelService.DownloadWorkSheet(mapped);
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
        margin-top: 30px;
        margin-right: 24px;
        height: calc(100% - 30px);
        //background-color: $dusk;
        // border-top-left-radius: 100px;
        //box-shadow: inset 100px 100px 600px $deepDusk;
        // filter: blur(25px);
    }

    hr {
        width: 100%;
        border-style: solid;
        border-color: $lightDusk;
        color: $lightDusk;
    }

    .hidden {
        display: none;
    }

    .graph {
        height: 100%;
        overflow: hidden;
        max-height: 100%;
        max-width: 100%;

        // background-color: $dusk;
        // border-top-left-radius: 100px;
        // box-shadow: inset 0px 0px 600px $deepDusk;
        // backdrop-filter: blur(250px);
    }

    .graph-wrapper {
        height: 100%;
        min-height: 60vh;
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
            background-color: $deepPurple;
            font-family: rift-soft, sans-serif;
            font-weight: 300;
            border-radius: 18px;
            padding: 0;
            border-style: none;
            white-space: nowrap;
            text-align: center;
            padding: 9.2px 42px;
            font-size: 1em;
            transition: all 250ms ease-in;

            &:hover {
                cursor: pointer;
                background-color: darken($deepPurple, 10%);
            }
        }
    }

</style>
