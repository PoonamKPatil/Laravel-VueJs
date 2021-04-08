<template>
    <div>
      <fatal-error v-if="error"></fatal-error>
      <div class="row" v-else>
        <div :class="[{'col-md-4' : twoColumns},{'d-none': oneColumn}]">
          <div class="card">
            <div class="card-body">
              <div v-if="loading">Loading!!</div>
              <div v-if="hasBooking">
                <p>
                  Stayed At
                  <router-link :to="{name : 'bookable', params: {id : booking.bookable.bookable_id}}">
                    {{booking.bookable.title}}
                  </router-link>
                </p> 
                <p>
                  From : {{booking.from}}
                  To : {{booking.to}}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div :class="[{'col-md-8': twoColumns},{'col-md-12': oneColumn}]">
          <div v-if="loading">Loading...</div>
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
                  <textarea v-model="review.content" name="content" id="" cols="30" rows="10" class="form-control"></textarea>
              </div>
              <button class="btn btn-lg btn-primary btn-block" @click.prevent="submit" :disabled="loading">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import {is404} from '../shared/utils/response';
export default {
  data() {
    return {
        loading:false,
        review: {
            id: null,
            rating: 5,
            content: null
        },
        existingReview : null,
        booking: null,
        error:false
    }
  },
  created() {
    this.loading = true;
    this.review.id = this.$route.params.id;
    
    // 1) if review already exists (table reviews by id)
    axios.get(`/api/reviews/${this.$route.params.id}`)
        .then(response => {
          this.existingReview = response.data.data 
        })
        .catch(err => {
          // 2) fetch booking by review key
          if (is404(err)) {
            return axios.get(`/api/booking-by-review/${this.review.id}`).then(
              response => {
                this.booking = response.data.data
              }).catch(err => {
                // !is404(err) ? {} : this.error = true;
                //or
                // if (!is404(err)) {
                //   this.error = true;
                // }
                //or
                this.error = !is404(err);
              })
          }
          this.error = true;
        })
        .then(response => {
          console.log(response)
          this.loading = false  
        });
    //store review
  },
  computed: {
    alreadyReviewed() {
      return this.hasReview || !this.booking;
    },
    hasReview() {
      return this.existingReview !== null;
    },
    hasBooking() {
      return this.booking !== null;
    },
    oneColumn() {
      return this.loading || this.alreadyReviewed;
    },
    twoColumns() {
      return !this.loading && !this.alreadyReviewed
    }
  },
  methods: {
    // onRatingchanged(rating) {
    //     console.log(rating)
    // }
    submit() {
      this.loading = true;
      axios
      .post(`/api/reviews`, this.review).then(response => {
        console.log(response)
      })
      .catch(err => {
        this.error = true;
      })
      .then(() => {
        this.loading = false
      });
    } 
  }
}
</script>