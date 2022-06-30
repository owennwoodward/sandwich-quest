<template lang="">
  <div>
    <img v-if="rating >= 5" src="../assets/img/yelpStars/stars_regular_5.png"/>
    <img  v-else-if=" rating >= 4.5" src="../assets/img/yelpStars/stars_regular_4_half.png"/>
    <img  v-else-if="rating >= 4" src="../assets/img/yelpStars/stars_regular_4.png"/>
    <img  v-else-if=" rating >= 3.5" src="../assets/img/yelpStars/stars_regular_3_half.png"/>
    <img  v-else-if="rating >= 3" src="../assets/img/yelpStars/stars_regular_3.png"/>
    <img  v-else-if=" rating >= 2.5" src="../assets/img/yelpStars/stars_regular_2_half.png"/>
    <img  v-else-if="rating >= 2" src="../assets/img/yelpStars/stars_regular_2.png"/>
    <img  v-else-if=" rating >= 1.5" src="../assets/img/yelpStars/stars_regular_1_half.png"/>
    <img  v-else-if="rating >= 1" src="../assets/img/yelpStars/stars_regular_1.png"/>
    <img  v-else-if="rating >= 0" src="../assets/img/yelpStars/stars_regular_0.png"/>


  </div>
</template>
<script>
export default {
  props: {
    rating: {
      type: Number,
      required: true
    }
  },
  setup() {
    
    return {
      //TODO unbreak this thing
                  getRatingPicture(rating) {
                let imgString = ''
                switch (rating) {
                    case rating < .5:
                        imgString =  '../assets/img/yelpStars/stars_regular_0.png';
                        break
                    case rating < 1.5:
                        imgString =  '../assets/img/yelpStars/stars_regular_1.png';
                        break
                    case rating < 2:
                        imgString =  '../assets/img/yelpStars/stars_regular_1_half.png';
                        break
                    case rating < 2.5:
                        imgString =  '../assets/img/yelpStars/stars_regular_2.png';
                        break
                    case rating < 3:
                        imgString =  '../assets/img/yelpStars/stars_regular_2_half.png';
                        break
                    case rating < 3.5:
                        imgString =  '../assets/img/yelpStars/stars_regular_3.png';
                        break
                    case rating < 4:
                        imgString =  '../assets/img/yelpStars/stars_regular_3_half.png';
                        break
                    case rating < 4.5:
                        imgString =  '../assets/img/yelpStars/stars_regular_4.png';
                        break
                    case rating < 5:
                        imgString =  '../assets/img/yelpStars/stars_regular_4_half.png';
                        break
                    default:
                        imgString =  '../assets/img/yelpStars/stars_regular_5.png';
                        break
                }
                return imgString
            },
    }
  }
  
}
</script>
<style lang="">
  
</style>