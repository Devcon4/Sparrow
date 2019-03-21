<template>
    <div class="header"></div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Header extends Vue {

}
</script>

<style lang="scss" scoped>
@import '../styles';

    .header {
        margin-left: 24px;
        margin-right: 24px;
        margin-bottom: 24px;
        height: 100%;
        background-color: $dusk;
        border-bottom-left-radius: 24px;
        border-bottom-right-radius: 24px;
    }

</style>
