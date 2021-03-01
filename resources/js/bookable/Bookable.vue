<template>
<div class="row">
    <div class="col-md-8">
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
    </div>
    <div class="col-md-4">
        Availability & Prices
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            bookable : null,
            loading : false
        }
    },
    created() {
        this.loading = true;
        axios.get(`/api/bookables/${this.$route.params.id}`).then(
            response => {
                this.bookable = response.data
                this.loading = false
            }
        ).catch(response => console.log("ERROR"))
    }
}
</script>
