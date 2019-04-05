<template>
    <div class="header">
        <input type="text" list="sprint_list" v-model="currentSprintId">
        <datalist name="sprint" id="sprint_list">
            <option v-for="sprint in sprints" :key="sprint.id" :value="sprint.id">{{sprint.value.text}}</option>
        </datalist>
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

    input {
        width: 10%;
        border-radius: 8px;
        background-color: $purple;
        outline: none;
        border: 0px;
        color: white;

        &:hover {
            cursor: pointer;
        }
    }

</style>
