<template>
    <div>
        <nav class="navbar bg-white border-bottom navbar-light ">
            <router-link class = "navbar-brand" v-bind:to = "{name: 'home'}">Home</router-link>
            <!-- <router-link class = "btn nav-button" v-bind:to = "{name: 'second'}">Second</router-link> -->
        </nav>
       
       <div class="container mt-4 mb-4 pr-4 pl-4">
           <router-view></router-view>
       </div>
    </div>
</template>

<script>
import moment from 'moment';
import {mapState} from 'vuex';
export default {
    data() {
        return {
            lastSearch: this.$store.state.lastSearch
        }
    },
    filters:{
        fromNow(value) {
            return moment(value).fromNow();
        }
    },
    computed: {
        ...mapState({
            // lastSearchComputed : state  => state.lastSearch
            //or
            lastSearchComputed : 'lastSearch',
            //or
            // lastSearchComputed (state) {
            //     return state.lastSearch
            // }
        })
    }
}
</script>