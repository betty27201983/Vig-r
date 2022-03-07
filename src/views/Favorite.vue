<template>
    <div class="loop-holder" style="top: 83px">
        <div class="loop-holder__text">Favorite - Favorite - Favorite - </div>
        <div class="loop-holder__text">Favorite - Favorite - Favorite - </div>
        <div class="loop-holder__text">Favorite - Favorite - Favorite - </div>
        <div class="loop-holder__text">Favorite - Favorite - Favorite - </div>
    </div>

    <div class="container notoTC pb-5">
        <p class="noto" style="margin-top: 250px;">
        <a href="" class="me-3 text-decoration-none link-secondary">Home</a>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16">
        <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
        </svg>
        <span class="ms-3 fw-bold">Favorite</span>
        </p>

        <img class="img-fluid mb-5" src="~@/../src/assets/images/favorite.png" alt="about">

        <div v-if="myFavorite.length <= 0" class="p-4 border border-white border-bottom-0 bg-table text-dark">
            <p class="text-center text-xl mb-6">目前沒有收藏商品，快去逛逛商店吧～</p>
            <router-link to="/item" class="d-block w-25 mx-auto btn btn-outline-primary mb-5">
                前往商店
            </router-link>
        </div>
        <table v-else class="mb-5">
        <tr class="d-none d-md-flex row g-0 p-4 border border-white border-bottom-0 bg-table text-dark">
            <td class="col-5">商品資料</td>
            <td class="col-2">價格</td>
            <td class="col-3">購買狀態</td>
            <td class="col-2">刪除</td>
        </tr>
        <tr v-for="item in products" :key="item.id" class="row g-0 border border-white align-items-center bg-table text-dark border-bottom-0 mb-3">
            <td class="col-5 col-md-5 mb-5 mb-md-0">
                <router-link :to="`/product/${item.id}`">
                <div class="d-flex align-items-center">
                    <img class="w-40 me-4 img-fluid w-50" :src="item.imageUrl" :alt="item.title" />
                    <h5 class="text-dark">{{ item.title }}</h5>
                </div>
                </router-link>
            </td>
            <td class="col-3 col-md-2">
                <div class="d-flex d-md-block align-items-end">
                    <p class="me-3 me-md-0">NT${{ $filters.currency(item.price) }}</p>
                    <p v-if="item.price !== item.origin_price" class="text-dark opacity-5 text-sm text-decoration-line-through">
                        NT${{ $filters.currency(item.origin_price) }}
                    </p>
                </div>
            </td>
            <td class="col-2 col-md-3">
                <button type="button" class="btn btn-primary btn-cart" @click.stop="addCart(item.id, 1)" :disabled="loadingStatus.loadingCart === item.id">
                    <div class="spinner-border spinner-border-sm" role="status" v-if="loadingStatus.loadingCart === item.id">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <i class="bi bi-cart2"></i> 加入購物車
                </button>
            </td>
            <td class="col-2">
                <button type="button" @click.stop.prevent="removeFavorite(item)" href="#" class="btn btn-danger">
                    <i class="bi bi-x-lg"></i> 移除收藏
                </button>
            </td>
        </tr>
        <tr class="d-flex justify-content-end rounded-bottom bg-table border border-white p-6">
            <td>
                <router-link to="/item" class="btn btn-dark btn-hover px-7">
                <span>繼續瀏覽商品</span>
                </router-link>
            </td>
        </tr>
        </table>
    </div>
</template>

<script>
import handleFavorite from '@/methods/handleFavorite'

export default {
  data () {
    return {
      carts: {},
      myFavorite: handleFavorite.getFavorite() || [],
      products: '',
      isLoading: false,
      loadingStatus: {}
    }
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
    addCart (id, qty = 1) {
      const api = `/api/${process.env.VUE_APP_PATH}/cart`
      const data = {
        product_id: id,
        qty
      }
      this.loadingStatus.loadingCart = id
      this.$http.post(api, { data })
        .then((response) => {
          if (!response.data.success) {
            this.$httpMessageState(response, '加入購物車')
            return
          }
          this.$httpMessageState(response, '加入購物車')
          this.emitter.emit('update-cart')
          this.loadingStatus.loadingCart = ''
        })
        .catch((error) => {
          this.loadingStatus.loadingCart = ''
          this.$httpMessageState(error, '連線錯誤')
        })
    },
    getFavorite () {
      this.myFavorite = handleFavorite.getFavorite()
      this.getAllProducts()
    },
    getAllProducts () {
      const api = `/api/${process.env.VUE_APP_PATH}/products/all`
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
