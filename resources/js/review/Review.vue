<template>
    <div>
      <div v-if="loading">
        Loading...
      </div>
      <div v-else>
        <div v-if="alreadyReviewed">
          <h3>You've already left review for this booking!!</h3>
        </div>
        <div v-else>
          <div class="form-group">
            <label class="text-muted" for="">Select Star rating (1-lowest, 5 -highest)</label>
            <!-- <star-rating :rating = review.rating class= "fa-3x" v-on:rating:changed="review.rating=$event"></star-rating> -->
            <star-rating v-model="review.rating" class = "fa-3x" ></star-rating>
          </div>
          <div class="form-group">
              <label for="content" class="text-muted"> Describe your experience with</label>
              <textarea name="content" id="" cols="30" rows="10" class="form-control"></textarea>
          </div>
          <button class="btn btn-lg btn-primary btn-block">Submit</button>
        </div>
      </div>
      
    </div>
</template>

<script>
export default {
  data() {
    return {
        loading:false,
        review: {
            rating: 5,
            content: null
        },
        existingReview : null,
        booking: null
    }
  },
  created() {
    this.loading = true;
    // if review already exists (table reviews by id)
    axios.get(`/api/reviews/${this.$route.params.id}`)
        .then(response => {
          this.existingReview = response.data.data 
        })
        .catch(err => {
          if (err.response && err.response.status && err.response.status === 404) {
            return axios.get(`/api/booking-by-review/${this.$route.params.id}`).then(
              response => {
                this.booking = response.data.data
              }
            )
          }
        })
        .then(response => {
          console.log(response)
          this.loading = false  
        });

    // fetch booking by review key

    //store review
  },
  computed: {
    alreadyReviewed() {
      return this.existingReview !== null;
    }
  },
  methods: {
    // onRatingchanged(rating) {
    //     console.log(rating)
    // }
  }
}
</script>