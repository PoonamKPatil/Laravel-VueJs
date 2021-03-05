<template>
    <div>
        <h6 class="text-uppercase text-secondary font-weight-bold">Check Availability</h6>
        <div class="form-row">
            <div class="form-group col-md-6">
                <label for="from">From</label>
                <input class = "form-control form-control-sm" type="text" name="from" placeholder="Start Date" v-model="from" @keyup.enter="check()">
            </div>
            <div class="form-group col-md-6">
                 <label for="to">To</label>
                <input class = "form-control form-control-sm" type="text" name="to" placeholder="End Date" v-model="to" @keyup.enter="check()">
            </div>
        </div>
        <!-- <button class="btn btn-secondary btn-block" v-on:click="check()">Check</button> -->
        <button class="btn btn-secondary btn-block" @click="check()">Check</button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            from:null,
            to:null
        }
    },
    methods: {
        check() {
            alert("check now")
        }
    },
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
