
require('./bootstrap');
import router from "./routes";
import VueRouter from 'vue-router';
import Index from './Index';
import moment from  'moment';
import Vue from "vue";
import StarRating from './shared/components/StarRating';

window.Vue = require('vue');

Vue.use(VueRouter);
Vue.component('star-rating', StarRating);

Vue.filter('fromNow', value => {
    return moment(value).fromNow(); 
});

const app = new Vue({
    el: '#app',
    router,
    components: { Index },
});
