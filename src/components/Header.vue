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
        <!-- <input type="text" list="sprint_list" v-model="currentSprintId">
        <datalist name="sprint" id="sprint_list">
            <option v-for="sprint in sprints" :key="sprint.id" :value="sprint.id">{{sprint.value.text}}</option>
        </datalist> -->
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import ServiceProvider from '../ServiceProvider';
import { mapState } from 'vuex';

@Component({
    computed: mapState(['sprints'])
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
        background-color: $purple;
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
