<template>
    <div class="row">
        <div class="col-md-8">
            <div class="row form-group">
                <div class="col-md-6 form-group">
                    <label for="first_name">First Name</label>
                    <input type="text" name="first_name" class="form-control"/>
                </div>
                <div class="col-md-6 form-group">
                    <label for="first_name">Last Name</label>
                    <input type="text" name="first_name" class="form-control"/>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 form-group">
                    <label for="email">Email</label>
                    <input type="text" name="email" class="form-control"/>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 form-group">
                    <label for="country">Country</label>
                    <input type="text" name="country" class="form-control"/>
                </div>
                 <div class="col-md-6 form-group">
                    <label for="state">State</label>
                    <input type="text" name="state" class="form-control"/>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 form-group">
                    <button class="btn btn-lg btn-primary btn-block" type="submit">Book Now!</button>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="d-flex justify-content-between">
                <h6 class="text-uppercase text-secondary font-weight-bolder">Your Cart</h6>
                <h6 class="badge badge-secondary text-uppercase">
                   <span v-if="itemsInBasketCount"> Items {{itemsInBasketCount}} </span>
                   <span v-else>Empty</span>
                </h6>
            </div>
            <transition-group>
                  <div v-for="item in basket" :key="item.bookable.id"> 
                <div class="pt-2 pb-4 border-top d-flex justify-content-between ">
                    <span>
                        <router-link :to="{name:'bookable', params:{'id':item.bookable.id}}">{{item.bookable.title}}</router-link>
                    </span>
                    <span class="font-weight-bold">
                       <i class="fas fa-rupee-sign"></i> {{item.price.total}}
                    </span>
                </div>
                <div class="pt-2 pb-4 d-flex justify-content-between">
                    <span>
                        From : {{item.dates.from}}
                    </span>
                    <span>
                        To: {{item.dates.to}}
                    </span>
                </div>
                <div class="pt-2 pb-2 text-right">
                    <button class="btn btn-sm btn-outline-secondary" @click="$store.dispatch('removeFromBasket',item.bookable.id)">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            </transition-group>
          
        </div>
    </div>
</template>

<script>
import {mapGetters,mapState} from 'vuex'

export default {
    computed: {
        ...mapState({
            basket: state => state.basket.items
        }),
        ...mapGetters(['itemsInBasketCount'])
    }
}
</script>

<style scoped>
    h6.badge {
        font-size: 100%;
    }
    a {
        color: black;
    }
</style>