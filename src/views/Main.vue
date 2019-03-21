<template>

<div class="grid">
    <Header class="header"></Header>
    <Sidebar class="sidebar"></Sidebar>
    <Overview class="overview"></Overview>
</div>

</template>
<script lang="ts">
import Vue from 'vue';
import Header from '../components/Header.vue';
import Sidebar from '../components/Sidebar.vue';
import Overview from '../components/Overview.vue';
import Component from 'vue-class-component';

@Component({
  components: { Header, Sidebar, Overview }
})
export default class MainView extends Vue {

}

</script>
<style lang="scss" scoped>
    .grid {
        display: grid;
        height: 100%;

        grid-template-columns: 200px 1fr;
        grid-template-rows: 150px 1fr;

        grid-template-areas: 'sidebar header' 'sidebar overview';
    }

    .header {
        grid-area: header;
    }

    .sidebar {
        grid-area: sidebar;
    }

    .overview {
        grid-area: overview;
    }
</style>
