<template>
    <div class="sidebar">
        <div class="logo">
            <div class="icon">
                <div class="circle">
                    <img src="../../public/img/temp-sparrow-logo.svg" alt="logo">
                </div>
            </div>
            <h1>Sparrow BI Tool</h1>
            <hr>
            <div class="desc">Fly-by workload data visualizations</div>
        </div>
        <div class="team">
            <div class="team-header">TEAM DATA</div>
            <ProfileCard v-for="member in members" :key="member.id" :member="member"></ProfileCard>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import ProfileCard from '../components/ProfileCard.vue';
import { mapState } from 'vuex';

@Component({
    components: { ProfileCard },
    computed: mapState(['members'])
})
export default class Sidebar extends Vue {

}
</script>

<style lang="scss" scoped>
    @import '../styles';

    .team-header {
        padding-bottom: 12px;
    }

    .team {
        margin-top: 120px;
        height: 100%;
        padding: 32px;

        box-shadow: inset 0px 0px 2400px $deepDusk;
        filter: drop-shadow(0px 0px 32px shade($purple, 60%));

        * {
            color: $purple;
        }
    }

    * {
        color: white;
    }

    .sidebar {
        display: flex;
        flex-direction: column;

    }

    .logo {
        margin: 32px;

        display: flex;
        flex-direction: column;
        align-items: center;

        h1 {
            margin-bottom: 0;
            text-align: left;
        }

        hr {
            width: 100%;
            margin-top: 0;
            margin-bottom: 12px;
        }
    }

    .icon {
        width: 100px;
        height: 100px;
        filter: drop-shadow(0px 12px 18px $purple);
        
        img {
            transform: scale(2.2);
        }


    }

    .circle {
        background-color: black;
        width: 100%;
        height: 100%;
        -webkit-clip-path: circle(50% at 50% 50%);
        clip-path: circle(50% at 50% 50%);

    }
</style>
