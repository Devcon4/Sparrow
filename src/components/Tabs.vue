<template>
    <div class="tabs" :class="{[color]: true}" v-if="!!tabState">
        <button class="tab" v-on:click="select({...tab}, index)" v-bind:class="{active: (selected === index)}" v-for="(tab, index) in tabState.list" :key="tab.name">{{tab.name}}</button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import Tab from '../models/Tab';
import { tabType } from '@/models/TabType';

@Component
export default class Tabs extends Vue {

    @Prop()
    private tabState: tabType;

    @Prop({
        default: 'yellow'
    })
    private color: 'blue' | 'green' | 'yellow' | 'purple';

    @Prop()
    private action?: (tab: Tab, index: number) => void; 

    private selected = 0;

    select(tab: Tab, index: number) {
        this.selected = index;
        if(this.action) {
            this.action(tab, index);
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '../styles';

    .tabs {
        display: flex;
    }

    button {
        margin-left: 4px;
        margin-right: 4px;
        color: white;
        border-radius: 18px;
        padding: 0;
        border-style: none;
        white-space: nowrap;
        text-align: center;
        padding: 4px 12px;
        background-color: inherit;
        outline: none;

        transition: background-color border 250ms linear;

        &:hover {
            cursor: pointer;
        }
    }

    // .active {
    //     border: 1px solid $yellow;
    // }

    .yellow {
        button:hover {
            background-color: $yellow;
        }

        .active {
            border: 1px solid $yellow;
        }
    }
    .blue {
        button:hover {
            background-color: $blue;
        }

        .active {
            border: 1px solid $blue;
        }
    }
    .green {
        button:hover {
            background-color: $green;
        }

        .active {
            border: 1px solid $green;
        }
    }

    .purple {
        button:hover {
            background-color: $purple;
        }

        .active {
            border: 1px solid $purple;
        }
    }

</style>
