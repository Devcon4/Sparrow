<template>
    <div class="header">
        <div class="sprint-wrapper">
            <md-field class="sprint-input">
            <label for="sprint">Sprint</label>
            <md-select v-model="currentSprintId" name="sprint" id="sprint">
                <md-option v-for="sprint in sprints" :key="sprint.id" :value="sprint.id">{{sprint.value.text}}</md-option>
            </md-select>
            </md-field>
        </div>
        <div class="content">
            <div class="stat">
                <div class="count-all">{{cardsRaw.length}}</div>
                <div class="desc">TOTAL CARDS</div>
            </div>
            <div class="stat" v-if="daysOfMonth">
                <div class="spinner-inner-wrapper"> <div class="spinner-inner"> <div class="spinner-inner-real"> {{daysOfMonth.percent | simplifyPercentage}}%</div></div></div>
                <md-progress-spinner :md-diameter="80" class="md-accent"  md-mode="determinate" :md-value="daysOfMonth.percent"></md-progress-spinner>
                <div class="desc">SPRINT COMPLETED</div>
            </div>
            <div class="stat">
                <div class="count-current">{{cards.length}}</div>
                <div class="desc">CARDS THIS SPRINT</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import ServiceProvider from '../ServiceProvider';
import { mapState } from 'vuex';

@Component({
    computed: mapState(['sprints', 'cardsRaw', 'cards', 'daysOfMonth']),
    filters: {
        simplifyPercentage(value: number) {
            return Math.trunc(value);
        }
    }
})
export default class Header extends Vue {

    public get currentSprintId() {
        return this.$store.state.currentSprintId;
    }

    public set currentSprintId(val) {
        this.$store.commit('setCurrentSprintId', val);
    }

}
</script>

<style lang="scss" scoped>
@import '../styles';

    .content {
        display: flex;
        width: 100%;
        justify-content: space-around;
    }

    .spinner-inner {
        height: 80px;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .spinner-inner-real {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 60px;
        height: 60px;
        border-radius: 80px;
        font-size: 1.5em;
        background-color: $deepPurple;
    }

    .spinner-inner-wrapper {
        height: 0;
    }

    .stat {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        * {
            font-family: rift-soft, sans-serif;
            font-weight: 300;
        }

        .desc {
            
        }

        .count-all, .count-current { 
            font-size: 72px;
            height: 45px;
        }

        .count-all {
            color: $purple;
        }

        .count-current {
            color: $yellow;
        }
    }

    .header {
        display: flex;
        margin-left: 24px;
        margin-right: 24px;
        margin-bottom: 24px;
        height: 100%;
        background-color: $dusk;
        border-bottom-left-radius: 24px;
        border-bottom-right-radius: 24px;
        z-index: 1;
    }

    .sprint-input {
        width: 100%;
    }

    .sprint-wrapper {
        width: 10%;
        padding: 8px;
        display: flex;
        align-items: center;
        color: white;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
        background-color: $deepPurple;
        outline: none;
        border: 0px;
        color: white;

        * {
            background-color: --md-theme-default-primary;
        }

        &:hover {
            cursor: pointer;
        }
    }

</style>
