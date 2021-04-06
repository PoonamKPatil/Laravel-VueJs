<template>
    <div>
        <h6 class="text-uppercase text-secondary font-weight-bold">
            Check Availability
            <span v-if="hasAvailability" class="text-success"> Available</span>
            <span v-if="noAvailability" class="text-danger"> Not Available</span>

        </h6>
        <div class="form-row">
            <div class="form-group col-md-6">
                <label for="from">From</label>
                <input class = "form-control form-control-sm" type="text" name="from" placeholder="Start Date" 
                v-model="from" @keyup.enter="check()" 
                :class="[{'is-invalid' : this.errorFor('from')}]">

                <div class="invalid-feedback" v-for="(error, index) in errorFor('from')" :key="'from' + index">
                    {{error}}
                </div>
            </div>
            <div class="form-group col-md-6">
                 <label for="to">To</label>
                <input class = "form-control form-control-sm" type="text" name="to" placeholder="End Date" 
                v-model="to" @keyup.enter="check()"
                :class="[{'is-invalid' : this.errorFor('to')}]">
                 <div class="invalid-feedback" v-for="(error, index) in errorFor('to')" :key="'from' + index">
                    {{error}}
                </div>
            </div>
        </div>
        <!-- <button class="btn btn-secondary btn-block" v-on:click="check()">Check</button> -->
        <button class="btn btn-secondary btn-block" @click="check()" :disabled="loading">Check</button>
    </div>
</template>
<script>
export default {
    props: {
        bookableId: String
    },
    data() {
        return {
            from: null,
            to: null,
            loading : false,
            status: null,
            errors : null
        }
    },
    methods: {
        check() {
            this.loading = true;
            this.errors = null;

            axios.get(`/api/bookable/${this.bookableId}/availability?from=${this.from}&to=${this.to}`)
            .then(response => {
                this.loading  = false
                this.status  = response.status
            }).catch(error => {
                if (error.response.status === 422) {
                    this.errors = error.response.data.errors
                }

                this.status = error.response.status

            }).then(
                this.loading = false
            );
        },

        errorFor($field) {
            return this.hasErrors && this.errors[$field] ? this.errors[$field] : null
        }
    },
    computed :{
        hasErrors() {
            return 422 === this.status && this.errors != null
        },

        hasAvailability() {
            return 200 === this.status
        },

        noAvailability() {
            return 404 === this.status
        }
    }
}
</script>
<style scoped>
label {
    font-size: 0.7rem;
    text-transform: uppercase;
    color: gray;
    font-weight: bolder;
}
</style>
