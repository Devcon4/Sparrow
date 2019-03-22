<template>
    <div class="overview">
        <div class="header">
            <h2>Overview</h2>
            <Tabs tabKey="range"></Tabs>
            <div class="spacer"></div>
            <Tabs tabKey="category"></Tabs>
            <div class="button">
                <button>DOWNLOAD EXCEL</button>
            </div>
        </div>
        <hr>
        <div class="graph">
            <!-- <Graph v-bind:graphConfig="this.firstConfig"></Graph> -->
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Tabs from '../components/Tabs.vue';
import Graph from '../components/Graph.vue';

@Component({
    components: { Tabs, Graph }
})
export default class Overview extends Vue {

    mounted() {
        this.$store.commit('addTabRecord', [
            'category', {
            activeIndex: 0,
            list: [
                {
                    name: 'Type of Work',
                    value: 'TOW'
                },
                {
                    name: 'Contract',
                    value: 'CONTRACT'
                },
                {
                    name: 'Owner',
                    value: 'OWNER'
                },
                {
                    name: 'Status',
                    value: 'STATUS'
                }
            ]}
        ]);
        this.$store.commit('addTabRecord', [
            'range', {
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
            ]}
        ]);
    }

}
</script>

<style lang="scss" scoped>
@import '../styles';

    .overview {
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
