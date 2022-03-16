<template>
  <Loading :isLoading="isLoading" />

  <BannerSwiper></BannerSwiper>

  <div class="cut-scenes mt-5 mb-5"></div>

  <div class="container-fluid pt-5 position-relative">
    <div class="row g-4 align-items-center justify-content-center">
      <div class="col-md-4 col-10 animated">
        <h2 class="fw-bold">Introduction</h2>
        <p class="fs-2 notoTC">品牌獨創，引領新潮流</p>
        <p class="notoTC">
          主要生產運動鞋、運動服裝、體育用品 <br>
          致力於設計及製造優質的鞋款 <br>
          滿足消費者在運動上需求以及場外的時尚風格營造 <br>
          推廣體育風潮 <br>
          品牌內涵主打年輕活力 <br>
          打造專屬於年輕人的新世代 <br>
        </p>
        <p class="noto">
          Mainly produces sports shoes, sportswear, sporting goods <br>
          Committed to the design and manufacture of high-quality shoes <br>
          Meet the needs of consumers in sports and create fashion styles off the field <br>
          Promote sports trends <br>
          Brand connotation focuses on youthful vitality <br>
          Create a new generation dedicated to young people <br>
        </p>
      </div>
      <div class="col-md-4 col-10 introduction-images rounded-3 animated">
      </div>
    </div>
      <div style="position: absolute; top: 0; left: 50px; z-index: -10;" class="animated">
        <img  class="img-fluid" src="~@/../src/assets/images/shape.png" alt="">
      </div>
      <div style="position: absolute; bottom: -10px; right: 0px; z-index: 2;" class="animated">
        <img class="img-fluid" src="~@/../src/assets/images/shape2.png" alt="">
      </div>
  </div>

  <div class="position-relative">
    <div class="container mt-5 mb-5 pt-5">
      <h2 class="display-5 fw-bold text-center">COLOR SIMULATION</h2>
      <p class="text-center mb-5 notoTC">尋找你最喜歡的個性風格</p>
      <div class="position-relative">
        <swiper class="rounded-3 shadow" :modules="modules" :effect="'fade'" :autoplay="{delay: 3000,disableOnInteraction: false}">
          <swiper-slide><img class="img-fluid" src="~@/../src/assets/images/color-simulation.png" alt="Slide 1"></swiper-slide>
          <swiper-slide><img class="img-fluid" src="~@/../src/assets/images/color-simulation2.png" alt="Slide 2"></swiper-slide>
          <swiper-slide><img class="img-fluid" src="~@/../src/assets/images/color-simulation3.png" alt="Slide 3"></swiper-slide>
        </swiper>
        <div class="card text-center rounded-3 overflow-hidden w-50 d-none d-lg-block notoTC" style="position: absolute; right: 50px; top: 50px; z-index: 1; opacity: 90%">
          <div class="card-header">
            特惠季-要買要快
          </div>
          <div class="card-body">
            <h5 class="card-title">多種款式、顏色任君挑選</h5>
            <p class="card-text">本店有包含各種運動服裝、運動鞋、運動器材等等產品等您來選購，價格便宜、風格多樣，滿足客人的願望和感受。</p>
              <a href="#" class="btn btn-primary">手刀選購</a>
          </div>
        </div>
      </div>
    </div>
  </div>

    <div class="loop-holder" style="bottom: -50px; opacity: 30%">
      <div class="loop-holder__text">VigΩr - VigΩr - VigΩr - </div>
      <div class="loop-holder__text">VigΩr - VigΩr - VigΩr - </div>
      <div class="loop-holder__text">VigΩr - VigΩr - VigΩr - </div>
      <div class="loop-holder__text">VigΩr - VigΩr - VigΩr - </div>
    </div>

  <div class="container pt-5 notoTC">
    <h2 class="display-5 fw-bold text-center noto">Item Lists</h2>
    <p class="text-center">各種顏色流線型設計，想怎麼搭，就怎麼搭</p>
    <div class="row row-cols-lg-2 align-items-center justify-content-center position-relative">
      <div class="col-lg-7 col-10 product animated"></div>
      <div class="col-lg-5 col-10 pe-5 animated">
        <h2 class="fw-bold">#247</h2>
        <p class="lh-lg">在2016年推出的247襲捲平民時尚界的風潮，歐美韓台的明星也在各個場合挑戰穿搭，在設計時就以型號247為主軸，也就是能夠穿24小時X 7天，主打以舒適度及每天都能輕鬆搭配，白話一點就是「你整年只需要這一雙鞋就夠了！」<br>
        在247身上，我們可以看見許多以往款式的身影，用最扎實又奢華的路線成功打造了這款247。</p>
      </div>
      <div class="position-absolute top-50 start-50 translate-middle" style="z-index: -10;">
        <img  class="img-fluid" src="~@/../src/assets/images/shape3.png" alt="">
      </div>
    </div>

    <div class="row row-cols-lg-2 flex-row-reverse align-items-center justify-content-center position-relative">
      <div class="col-lg-7 col-10 product-2 animated"></div>
      <div class="col-lg-4 col-10 text-end animated">
        <h2 class="fw-bold">#Bounce M</h2>
        <p class="lh-lg text-start">新推出的Bounce M系列鞋款，從專業運動員的跑步與訓練出發，也成為了各界運動員訓練時的最佳選擇。 <br>
        不只外表潮流，它採用FORGED Mesh透氣網面，讓包覆感和透氣合而為一，同時搭載BOUNCE緩震中底，適合跑步及多面向訓練等各種強度的訓練，最重要的是鞋底所採用的Continental™ 馬牌輪胎鞋底，增強抓地力讓跑者在變換方向及調整速度都有更好的體驗。</p>
      </div>
      <div class="position-absolute top-50 start-50 translate-middle" style="z-index: -10;">
        <img  class="img-fluid" src="~@/../src/assets/images/shape4.png" alt="">
      </div>
    </div>
  </div>

  <div class="cut-scenes-2 mt-5 mb-5"></div>

  <div class="container">
    <div class="row justify-content-center align-items-center text-center">
      <div class="col-6 p-0">
        <img class="img-fluid" src="~@/../src/assets/images/coupon.jpg" alt="">
      </div>
      <div class="col-6 bg-light p-5" style="height: 500px">
        <h2 class="fw-bold display-5 mt-5 text-muted">享受商品折扣優惠</h2>
        <p class="mb-5">感謝祭活動期間快來領取優惠券！ <br> （活動至 2022/4/30 截止）</p>
        <h4 class="fw-bold text-success mb-4"><i class="bi bi-gift-fill me-2"></i>恭喜您獲得優惠碼<i class="bi bi-gift-fill ms-2"></i></h4>
        <div class="bg-secondary h-25 d-flex text-white justify-content-evenly align-items-center fw-bold fs-2">
          <div class="bg-dark w-25">商品 <br> 75折</div>
          <div class="">Vigorisgood</div>
        </div>
      </div>
    </div>
  </div>

  <div class="container pt-5 mb-5 notoTC">
    <h2 class="display-5 fw-bold text-center noto">REVIEW</h2>
    <p class="text-center mb-5">這裡有很棒的評論對於顧客使用的想法</p>
    <div class="row">
      <div class="col-3">
        <div class="card h-100" style="width: 18rem;">
          <div class="card-body">
            <h6 class="card-subtitle mb-2 text-muted d-flex justify-content-between align-items-center">
              <div>
                <img class="img-fluid me-2" style="width: 50px" src="~@/../src/assets/images/review1.png" alt="">
                Chen Lin
              </div>
              <div>
                <span class="rounded-pill bg-secondary text-white badge ms-5"><i class="bi bi-star-fill"></i>4.6</span>
              </div>
            </h6>
            <h5 class="card-title">質量很好!!!</h5>
            <p class="card-text">包裝上也很用心，新開幕的優惠折扣真的太佛心啦~之後絕對會再回購的。</p>
            <a href="#/product/-MwL4lWhQXNtAPPaxNiO" class="card-link text-decoration-none text-muted d-flex justify-content-end align-items-center small">灰色牛仔造型鴨舌帽<img class="img-fluid ms-3" style="width: 50px" src="https://images.unsplash.com/photo-1521369909029-2afed882baee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt=""></a>
          </div>
        </div>
      </div>
      <div class="col-3">
        <div class="card bg-secondary text-white h-100" style="width: 18rem;">
          <div class="card-body">
            <h6 class="card-subtitle mb-2 d-flex justify-content-between align-items-center">
              <div>
                <img class="img-fluid me-2" style="width: 50px" src="~@/../src/assets/images/review2.png" alt="">
                Mia Rose
              </div>
              <div>
                <span class="rounded-pill bg-white text-secondary badge ms-5"><i class="bi bi-star-fill"></i>5.0</span>
              </div>
            </h6>
            <h5 class="card-title">快速的出貨速度</h5>
            <p class="card-text">包裝很完整，商品質感超極佳，物超所值，優質的店家給予五星評價。</p>
            <a href="#/product/-MwL4j7NPwSI6rTx5Jce" class="card-link text-decoration-none text-white d-flex justify-content-end align-items-center small">緊身牛仔破褲<img class="img-fluid ms-3" style="width: 50px" src="https://images.unsplash.com/photo-1454720503269-3a35c21bebc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=706&q=80" alt=""></a>
          </div>
        </div>
      </div>
      <div class="col-3">
        <div class="card h-100" style="width: 18rem;">
          <div class="card-body">
            <h6 class="card-subtitle mb-2 text-muted d-flex justify-content-between align-items-center">
              <div>
                <img class="img-fluid me-2" style="width: 50px" src="~@/../src/assets/images/review3.png" alt="">
                James Smith
              </div>
              <div>
                <span class="rounded-pill bg-secondary text-white badge ms-5"><i class="bi bi-star-fill"></i>4.7</span>
              </div>
            </h6>
            <h5 class="card-title">品質與價格一致</h5>
            <p class="card-text">cp值高、包裝完善，商品無色差，穿起來真的好看，物美價廉，願意再次購買。</p>
            <a href="#/product/-MwL4qTwDWIcdXOXU13J" class="card-link text-decoration-none text-muted d-flex justify-content-end align-items-center small">黑色骷髏圖示襯衫<img class="img-fluid ms-3" style="width: 50px" src="https://images.unsplash.com/photo-1503341733017-1901578f9f1e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt=""></a>
          </div>
        </div>
      </div>
      <div class="col-3">
        <div class="card bg-secondary text-white h-100" style="width: 18rem;">
          <div class="card-body">
            <h6 class="card-subtitle mb-2 d-flex justify-content-between align-items-center">
              <div>
                <img class="img-fluid me-2" style="width: 50px" src="~@/../src/assets/images/review4.png" alt="">
                Emma Liz
              </div>
              <div>
                <span class="rounded-pill bg-white text-secondary badge ms-5"><i class="bi bi-star-fill"></i>4.5</span>
              </div>
            </h6>
            <h5 class="card-title">買到賺到!!!</h5>
            <p class="card-text">回購好多次了，真的很愛這家的衣服，穿起來超級舒服，都會付出貨單讓買家確認商品。</p>
            <a href="#/product/-MwL5Gio_FVPeUaFBGEB" class="card-link text-decoration-none d-flex justify-content-end align-items-center small text-white">Neon Light螢光鞋款<img class="img-fluid ms-3" style="width: 50px" src="https://images.unsplash.com/photo-1604671801908-6f0c6a092c05?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt=""></a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="container pb-5">
    <h2 class="fw-bold">News</h2>
    <p class="pb-4">目前沒有新的公告</p>
  </div>
</template>

<script>
import BannerSwiper from '../components/BannerSwiper.vue'

import $ from 'jquery'

import { EffectFade, Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue/swiper-vue'
import 'swiper/swiper.scss'
import 'swiper/modules/effect-fade/effect-fade.scss'

export default {
  data () {
    return {
      products: [],
      isLoading: false
    }
  },
  components: {
    BannerSwiper,
    Swiper,
    SwiperSlide
  },
  methods: {
    getProducts () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      this.isLoading = true
      this.$http.get(api).then((response) => {
        this.products = response.data.products
        console.log('products:', response)
        this.isLoading = false
      })
    }
  },
  mounted () {
    // 類似監聽 scroll 滾動位置
    $(window).scroll(function () {
      // 讀取 scroll 滾動位置
      const scrollPos = $(window).scrollTop()
      // 讀取 window 高度
      const windowHeight = $(window).height()
      // css 動畫
      $('.animated').each(function () {
        const thisPos = $(this).offset().top
        console.log(thisPos)
        if ((windowHeight + scrollPos) >= (thisPos + 300)) {
          $(this).addClass('fadeIn')
        }
      })
    })
    this.getProducts()
  },
  setup () {
    return {
      modules: [EffectFade, Autoplay]
    }
  }
}
</script>
