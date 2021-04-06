<template>
<div class="row">
    <div class="col-md-8 pb-4">
        <div class="card">
            <div class="card-body">
                <div v-if="!loading"> 
                    <h5 class="title">{{bookable.title}}</h5>
                    <hr>
                    <article>{{bookable.description}}</article>
                </div>
                <div v-else>
                    Loading.........!!!!!
                </div> 
            </div>
        </div>
       <reviews-list :bookable-id = this.$route.params.id></reviews-list>

    </div>
    <div class="col-md-4 pb-4">
       <availability :bookable-id = this.$route.params.id></availability>
    </div>

</div>
</template>

<script>
import Availability from './Availability'
import ReviewsList from './ReviewsList'

export default {
   
    data() {
        return {
            bookable : null,
            loading : false
        }
    },
    components: {
        Availability,
        ReviewsList
    },
    created() {
        this.loading = true;
        axios.get(`/api/bookables/${this.$route.params.id}`).then(
            response => {
                this.bookable = response.data.data
                this.loading = false
            }
        ).catch(response => console.log("ERROR"))
    }
}
</script>
