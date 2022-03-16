<template>
  <div class="position-relative text-center">
    <div class="container" style="margin-top: 83px;">
        <swiper :modules="modules" :effect="'fade'" :autoplay="{delay: 5000,disableOnInteraction: false}">
          <swiper-slide><img src="~@/../src/assets/images/banner.png" alt="Slide 1"></swiper-slide>
          <swiper-slide><img src="~@/../src/assets/images/banner2.png" alt="Slide 2"></swiper-slide>
          <swiper-slide><img src="~@/../src/assets/images/banner3.png" alt="Slide 3"></swiper-slide>
        </swiper>
      <div class="banner-text fw-bold text-white font-monospace text-uppercase position-absolute" style="left: 200px">
        <p>Fashion <br> Dynamic</p>
      </div>
    </div>
  </div>

    <div class="loop-holder" style="top: 300px;">
      <div class="loop-holder__text">VigΩr - VigΩr - VigΩr - </div>
      <div class="loop-holder__text">VigΩr - VigΩr - VigΩr - </div>
      <div class="loop-holder__text">VigΩr - VigΩr - VigΩr - </div>
      <div class="loop-holder__text">VigΩr - VigΩr - VigΩr - </div>
    </div>
</template>

<script>
import { EffectFade, Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue/swiper-vue'

import 'swiper/swiper.scss'
import 'swiper/modules/effect-fade/effect-fade.scss'

export default {
  components: {
    Swiper,
    SwiperSlide
  },
  setup () {
    return {
      modules: [EffectFade, Autoplay]
    }
  }
}
</script>
