<template>
    <div class="data-tile" v-if="!!card">
        <div class="tow">{{card.typeOfWorkName}}</div>
        <div class="name">{{card.title}}</div>
        <div class="members">{{card.members}}</div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import Card from '../models/Card';

@Component
export default class DataTile extends Vue {

    @Prop()
    card: Card;

}
</script>

<style lang="scss" scoped>
@import '../styles';
    .data-tile {
        display: flex;
        justify-content: space-between;
        // border-radius: 6px;
        // filter: drop-shadow(0px 1px 2px black);
        margin: 8px;
        padding: 16px;
        background-color: $dusk;

        div {
            text-align: left;
        }

        div:last-child {
            text-align: right;
        }

        .tow {
            width: 30%;
        }

        .name {
            width: 50%;
        }

        .members {
            width: 20%;
        }
    }
</style>
