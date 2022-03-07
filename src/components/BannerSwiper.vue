<template>
  <div class="position-relative">
    <div class="container" style="margin-top: 83px;">
        <div id="carouselExampleIndicators" class="carousel slide carousel-fade" data-bs-ride="carousel">
        <div class="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div class="carousel-inner banner" ref="myCarousel">
            <div class="carousel-item active">
                <img src="~@/../src/assets/images/banner.png" class="d-block w-100 banner-transform img-fluid" alt="banner1">
            </div>
            <div class="carousel-item">
                <img src="~@/../src/assets/images/banner2.png" class="d-block w-100 banner-transform img-fluid" alt="banner2">
            </div>
            <div class="carousel-item">
                <img src="~@/../src/assets/images/banner3.png" class="d-block w-100 banner-transform img-fluid" alt="banner3">
            </div>
        <div class="banner-text fw-bold text-white font-monospace text-uppercase">
          <p>Fashion <br> Dynamic</p>
        </div>
        </div>
        </div>
    </div>

    <div class="loop-holder" style="top: 250px;">
      <div class="loop-holder__text">VigΩr - VigΩr - VigΩr - </div>
      <div class="loop-holder__text">VigΩr - VigΩr - VigΩr - </div>
      <div class="loop-holder__text">VigΩr - VigΩr - VigΩr - </div>
      <div class="loop-holder__text">VigΩr - VigΩr - VigΩr - </div>
    </div>
  </div>
</template>

<script>
import Carousel from 'bootstrap/js/dist/carousel'

export default {
  data () {
    return {
      carousel: ''
    }
  },
  mounted () {
    // 圖片輪播
    this.carousel = new Carousel(this.$refs.myCarousel, {
      interval: 1000
    })
  }
}
</script>
