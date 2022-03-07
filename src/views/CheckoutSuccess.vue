<template>
<Loading :active="isLoading"></Loading>
    <div class="order-success banner" style="margin-top: 200px; margin-bottom: 200px">
    <div class="container h-100 d-flex align-items-center justify-content-center text-secondary">
      <div>
        <h1 class="display-3 fw-bold text-center">
          訂單成立
          <span class="d-none d-md-inline">，</span>
          <br class="d-md-none">
          感謝您的購買
        </h1>
        <div class="d-md-flex justify-content-md-between w-100 py-5">
          <router-link
            :to="`/checkout/${orderId}`"
            class="custom-btn btn btn-outline-secondary shadow btn-lg mb-3 mb-md-0">
            查看訂單
          </router-link>
          <router-link
            to="/products"
            class="custom-btn btn btn-outline-secondary btn-lg shadow">
            繼續逛逛
          </router-link>
        </div>
      </div>
    </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      order: '',
      orderId: '',
      isLoading: false
    }
  },
  inject: ['$httpMessageState'],
  methods: {
    getOrder () {
      this.isLoading = true
      this.orderId = this.$route.params.orderId
      const api = `/api/${process.env.VUE_APP_APIPATH}/order/${this.orderId}`
      this.$http.get(api)
        .then((response) => {
          if (!response.data.success) {
            this.$httpMessageState(response, '取得訂單資料')
            this.isLoading = false
            return
          }
          this.order = response.data.order
          this.isLoading = false
        })
        .catch((error) => {
          this.$httpMessageState(error, '連線錯誤')
          this.isLoading = false
        })
    }
  },
  created () {
    this.$http.defaults.baseURL = process.env.VUE_APP_API
    this.getOrder()
  }
}
</script>
