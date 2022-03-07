<template>
  <Loading :active="isLoading"></Loading>
  <div class="container" style="margin-top: 83px">

    <nav aria-label="breadcrumb noto">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link to="/" class="me-3 text-decoration-none link-secondary">Home</router-link></li>
        <i class="bi bi-caret-right-fill me-3"></i>
        <li class="breadcrumb-item"><router-link to="/item" class="me-3 text-decoration-none link-secondary">Item</router-link></li>
        <i class="bi bi-caret-right-fill me-3"></i>
        <li class="breadcrumb-item fw-bold active" aria-current="page">{{ product.title }}</li>
      </ol>
    </nav>
    <div class="row justify-content-center">
      <article class="col-8">
        <h2>{{ product.title }}</h2>
        <div class="mb-3">說明內容： <br> {{ product.content }}</div>
        <div class="mb-3">產品描述： <br> {{ product.description }}</div>
        <img :src="product.imageUrl" alt="" class="img-fluid mb-3">
      </article>
      <div class="col-4">
        <div class="sticky-top" style="top: 83px; margin-bottom: 50px">
          <div class="h5" v-if="!product.price">{{ product.origin_price }} 元</div>
          <del class="h6" v-if="product.price">原價 {{ product.origin_price }} 元</del>
          <div class="h5" v-if="product.price">現在只要 {{ product.price }} 元</div>
          <hr>
          <button type="button" class="btn btn-outline-danger"
                  @click="addToCart(product.id)">
            加到購物車
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      product: {},
      id: ''
    }
  },
  methods: {
    getProduct () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${this.id}`
      this.isLoading = true
      this.$http.get(api).then((response) => {
        console.log(response.data)
        this.isLoading = false
        if (response.data.success) {
          this.product = response.data.product
        }
      })
    },
    addToCart (id, qty = 1) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      const cart = {
        product_id: id,
        qty
      }
      this.isLoading = true
      this.$http.post(url, { data: cart }).then((response) => {
        this.isLoading = false
        this.$httpMessageState(response, '加入購物車')
      })
    }
  },
  created () {
    this.id = this.$route.params.productId
    this.getProduct()
  }
}
</script>
