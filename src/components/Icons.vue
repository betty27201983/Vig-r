<template>
    <div class="position-relative">
    <div style="position: fixed; bottom: 15px; right: 15px; z-index: 100;">
      <ArrowUp></ArrowUp>
      <router-link to="login" class="p-3 d-block" title="login">
        <img src="~@/../src/assets/images/person-circle.png" alt="user">
      </router-link>
      <router-link to="/cart" class="p-3 d-block position-relative" title="cart">
        <img src="~@/../src/assets/images/bag-fill.png" alt="cart">
        <span class="position-absolute top-25 start-75 translate-middle badge bg-danger rounded-pill bg-secondary" v-if="carts.carts">{{ carts.carts.length }} <span class="visually-hidden">unread messages</span></span>
      </router-link>
    </div>
    </div>
</template>

<script>
import ArrowUp from '../components/ArrowUp.vue'
import handleFavorite from '@/methods/handleFavorite'

export default {
  data () {
    return {
      carts: {},
      myFavorite: handleFavorite.getFavorite() || [],
      products: '',
      isLoading: false
    }
  },
  components: {
    ArrowUp
  },
  inject: ['$httpMessageState', 'emitter'],
  methods: {
    getCart () {
      const api = `/api/${process.env.VUE_APP_PATH}/cart`
      this.$http.get(api)
        .then((response) => {
          if (!response.data.success) {
            this.$httpMessageState(response, '取得購物車列表')
            return
          }
          this.carts = response.data.data
        })
        .catch((error) => {
          this.$httpMessageState(error, '連線錯誤')
        })
    },
    getFavorite () {
      this.myFavorite = handleFavorite.getFavorite()
      this.getAllProducts()
    },
    removeFavorite (item) {
      this.isLoading = true
      this.myFavorite.splice(this.myFavorite.indexOf(item.id), 1)
      this.$httpMessageState({
        data: {
          success: true,
          message: `已將 ${item.title} 移除收藏`
        }
      }, '移除收藏')
      handleFavorite.storeFavorite(this.myFavorite)
      this.emitter.emit('update-favorite')
      this.isLoading = false
    },
    getAllProducts () {
      const api = `/api/${process.env.VUE_APP_APIPATH}/products/all`
      this.$http.get(api)
        .then((response) => {
          if (!response.data.success) {
            this.$httpMessageState(response, '取得全部產品資料')
            return
          }
          this.products = response.data.products
            .filter((product) => this.myFavorite.includes(product.id))
        })
        .catch((error) => {
          this.$httpMessageState(error, '連線錯誤')
        })
    }
  },
  mounted () {
    this.$http.defaults.baseURL = process.env.VUE_APP_API
    this.emitter.on('update-cart', this.getCart)
    this.emitter.on('update-favorite', this.getFavorite)
    this.getCart()
    this.getAllProducts()
  },
  unmounted () {
    this.emitter.off('update-cart', this.getCart)
    this.emitter.off('update-favorite', this.getFavorite)
  }
}
</script>
