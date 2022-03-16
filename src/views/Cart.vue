<template>
  <Loading :active="isLoading"></Loading>
  <div class="container notoTC">
        <div style="margin-top: 133px; margin-bottom: 80px">
          <div class="position-relative m-5">
            <div class="progress" style="height: 1px;">
              <div class="progress-bar" role="progressbar" style="width: 0%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <div class="position-absolute top-0 start-0 translate-middle bg-primary text-center p-1 text-white rounded-pill" style="width: 2rem; height:2rem;">1</div>
            <div class="position-absolute top-0 start-50 translate-middle bg-secondary text-center p-1 text-white rounded-pill" style="width: 2rem; height:2rem;">2</div>
            <div class="position-absolute top-0 start-100 translate-middle bg-secondary text-center p-1 text-white rounded-pill" style="width: 2rem; height:2rem;">3</div>
          </div>

          <h2 class="mb-5"><i class="bi bi-bag-check-fill pe-2"></i>購物車<span class="fs-6 text-muted">/確認購物車品項</span></h2>
          <div class="text-center mb-5" v-if="cart.carts !== undefined && cart.carts.length <= 0">
            <i class="bi bi-cart4 display-1 fw-bold text-primary"></i>
            <p class="bg-light text-primary fs-4 p-3">購物車目前無商品，歡迎選購</p>
          </div>
          <table class="table align-middle" v-else>
            <thead>
              <tr>
                <th></th>
                <th>品名</th>
                <th style="width: 110px">數量</th>
                <th>單價</th>
              </tr>
            </thead>
            <tbody>
            <template v-if="cart.carts">
              <tr v-for="item in cart.carts" :key="item.id">
                <td>
                  <button type="button" class="btn btn-outline-danger btn-sm"
                          :disabled="status.loadingItem === item.id"
                          @click="removeCartItem(item.id)">
                    <i class="bi bi-x"></i>
                  </button>
                </td>
                <td>
                  {{ item.product.title }}
                  <div class="text-success" v-if="item.coupon">
                    已套用優惠券
                  </div>
                </td>
                <td>
                  <div class="input-group input-group-sm">
                    <input type="number" class="form-control" min="1"
                          :disabled="item.id === status.loadingItem"
                          @change="updateCart(item)"
                          v-model.number="item.qty">
                    <div class="input-group-text">/ {{ item.product.unit }}</div>
                  </div>
                </td>
                <td class="text-end">
                  <small v-if="cart.final_total !== cart.total" class="text-success">折扣價：</small>
                  {{ $filters.currency(item.final_total) }}
                </td>
              </tr>
            </template>
            </tbody>
            <tfoot>
            <tr>
              <td colspan="3" class="text-end">總計</td>
              <td class="text-end">{{ $filters.currency(cart.total) }}</td>
            </tr>
            <tr v-if="cart.final_total !== cart.total">
              <td colspan="3" class="text-end text-success">折扣價</td>
              <td class="text-end text-success">{{ $filters.currency(cart.final_total) }}</td>
            </tr>
            </tfoot>
          </table>
          <div class="d-flex justify-content-between">
            <div class="input-group mb-3 w-50 h-50">
              <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼">
              <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">
                  套用優惠碼
                </button>
              </div>
            </div>
            <div v-if="cart.carts !== undefined && cart.carts.length <= 0">
              <router-link to="/item" class="btn btn-outline-primary mb-5">開始選購<i class="bi bi-caret-right-fill ms-1"></i></router-link>
            </div>
            <div v-else>
              <router-link to="/cartInfo" type="button" class="btn btn-outline-primary">前往結帳<i class="bi bi-caret-right-fill ms-1"></i></router-link>
            </div>
          </div>
        </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      products: [],
      product: {},
      status: {
        loadingItem: '' // 對應品項id
      },
      cart: {},
      coupon_code: ''
    }
  },
  methods: {
    getProducts () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      this.isLoading = true
      this.$http.get(url).then((response) => {
        this.products = response.data.products
        console.log('products:', response)
        this.isLoading = false
      })
    },
    getProduct (id) {
      this.$router.push(`/product/${id}`)
    },
    addCart (id) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.status.loadingItem = id
      const cart = {
        product_id: id,
        qty: 1
      }
      this.$http.post(url, { data: cart })
        .then((res) => {
          this.status.loadingItem = ''
          console.log(res)
        })
    },
    getCart () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.isLoading = true
      this.$http.get(url).then((response) => {
        console.log(response)
        this.cart = response.data.data
        this.isLoading = false
      })
    },
    updateCart (item) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`
      this.isLoading = true
      this.status.loadingItem = item.id
      const cart = {
        product_id: item.product_id,
        qty: item.qty
      }
      this.$http.put(url, { data: cart }).then((res) => {
        console.log(res)
        this.status.loadingItem = ''
        this.getCart()
      })
    },
    removeCartItem (id) {
      this.status.loadingItem = id
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`
      this.isLoading = true
      this.$http.delete(url).then((response) => {
        this.$httpMessageState(response, '移除購物車品項')
        this.status.loadingItem = ''
        this.getCart()
        this.isLoading = false
      })
    },
    addCouponCode () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/coupon`
      const coupon = {
        code: this.coupon_code
      }
      this.isLoading = true
      this.$http.post(url, { data: coupon }).then((response) => {
        this.$httpMessageState(response, '加入優惠券')
        this.getCart()
        this.isLoading = false
      })
    }
  },
  created () {
    this.getProducts()
    this.getCart()
  }
}
</script>
