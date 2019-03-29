<template>
    <div class="profile-card">
        <div class="profile" :style="{ backgroundImage: 'url(' + member.avatarUrl + ')' }"></div>
        <div class="actions">{{member.fullName}}</div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Member from '@/models/Member';
import { Prop } from 'vue-property-decorator';

@Component
export default class ProfileCard extends Vue {
    @Prop()
    member: Member;
}
</script>

<style lang="scss" scoped>
    
    .profile-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-bottom: 18px;
    }

    .profile {
        width: 60px;
        height: 60px;
        border-radius: 100px;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center; 
    }

    .actions {
        color: white;
        font-size: .8em;
    }
</style>
