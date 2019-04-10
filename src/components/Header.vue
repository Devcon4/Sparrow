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
    computed: mapState(['sprints', 'cardsRaw', 'cards'])
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

    .stat {
        display: flex;
        flex-direction: column;
        justify-content: center;
        
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
