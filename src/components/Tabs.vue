<template>
    <div class="tabs">
        <button class="tab" v-on:click="select(tab, index)" v-bind:class="{active: active[index]}" v-for="(tab, index) in tabs" v-bind:key="tab.name">{{tab.name}}</button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

export class Tab {
    name: string;
    value: string;
}

@Component
export default class Tabs extends Vue {

    @Prop()
    private tabs: Tab[] = [];

    @Prop()
    private action: (tab: Tab) => void;

    @Prop()
    private colorClass: {[key: string]: string} = {};

    private active: {[key: number]: boolean} = {0: true};

    select(tab: Tab, index: number) {
        this.active = {};
        this.active[index] = true;
        if(this.action) {
            this.action(tab);
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

        transition: all 250ms linear;

        &:hover {
            cursor: pointer;
            background-color: $yellow;
        }
    }

    .active {
        border: 1px solid $yellow;
    }

    .yellow {
        button:hover {
            background-color: $yellow;
        }

        .action {
            border: 1px solid $yellow;
        }
    }
    .blue {
        button:hover {
            background-color: $blue;
        }

        .action {
            border: 1px solid $blue;
        }
    }
    .green {
        button:hover {
            background-color: $green;
        }

        .action {
            border: 1px solid $green;
        }
    }

    .purple {
        button:hover {
            background-color: $purple;
        }

        .action {
            border: 1px solid $purple;
        }
    }

</style>
