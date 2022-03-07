<template>
    <Loading :isLoading="isLoading" />
    <div class="loop-holder" style="top: 83px">
        <div class="loop-holder__text">Item - Item - Item - </div>
        <div class="loop-holder__text">Item - Item - Item - </div>
        <div class="loop-holder__text">Item - Item - Item - </div>
        <div class="loop-holder__text">Item - Item - Item - </div>
    </div>

    <div class="container notoTC pb-5">
        <p class="noto" style="margin-top: 250px;">
        <router-link to="/" class="me-3 text-decoration-none link-secondary">Home</router-link>
        <i class="bi bi-caret-right-fill"></i>
        <span class="ms-3 fw-bold">Item</span>
        </p>

        <ul class="nav justify-content-center mb-5">
            <li class="nav-item">
                <a class="nav-link" @click.prevent="selectedCategory = ''; this.$route.params.selectedCategory = ''"
                :class="{ active : selectedCategory === '' }" href="#">All</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" @click.prevent="selectedCategory = '服裝'; this.$route.params.selectedCategory = '服裝'"
                :class="{ active : selectedCategory === '服裝' }" href="#">Clothing</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" @click.prevent="selectedCategory = '運動鞋'; this.$route.params.selectedCategory = '運動鞋'"
                :class="{ active : selectedCategory === '運動鞋' }" href="#">Shoes</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" @click.prevent="selectedCategory = '配件'; this.$route.params.selectedCategory = '配件'"
                :class="{ active : selectedCategory === '配件' }" href="#">Accessories</a>
            </li>
        </ul>

        <div class="row mb-5 g-3">
            <div class="col-4" v-for="item in filterProducts"
            :key="item.id">
                <div class="card card-hover">
                    <router-link :to="`/product/${item.id}`" style="cursor: pointer;"><img class="card-img" :style="{
                    background: `url(${item.imageUrl}) center center no-repeat`,
            backgroundSize: 'cover', height:'300px'}"></router-link>
                    <div class="card-body">
                        <div class="d-flex align-items-center justify-content-between">
                            <div>
                                <h5 class="card-title">{{ item.title }}</h5>
                                <p class="card-text text-muted">NT$ {{ $filters.currency(item.price) }}</p>
                                <del class="text-muted">NT$ {{ $filters.currency(item.origin_price) }} </del>
                            </div>
                            <div>
                                <button type="button" @click.stop="toggleFavorite(item)" class="btn btn-favorite fs-3">
                                  <i class="bi" :class="myFavorite.includes(item.id) ? 'bi-heart-fill' : 'bi-heart'"></i>
                                </button>
                                <button type="button" class="btn btn-cart fs-3" @click.stop="addCart(item.id, qty)" :disabled="loadingStatus.loadingCart === item.id">
                                  <div class="spinner-border spinner-border-sm" role="status" v-if="loadingStatus.loadingCart === item.id">
                                    <span class="visually-hidden">Loading...</span>
                                  </div>
                                    <i class="bi bi-cart2"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Pagination :pages="pagination" @update-page="getAllProducts"></Pagination>
    </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue'
import handleFavorite from '@/methods/handleFavorite'
export default ({
  data () {
    return {
      products: [],
      pagination: '',
      loadingStatus: {},
      qty: 1,
      myFavorite: handleFavorite.getFavorite() || [],
      isLoading: false,
      categories: [],
      selectedCategory: ''
    }
  },
  inject: ['$httpMessageState', 'emitter'],
  components: {
    Pagination
  },
  methods: {
    getAllProducts (page = 1) {
      this.isLoading = true
      const api = `/api/${process.env.VUE_APP_PATH}/products/all`
      this.$http.get(api)
        .then((response) => {
          if (!response.data.success) {
            this.$httpMessageState(response, '取得全部產品資料')
            this.isLoading = false
            return
          }
          this.products = response.data.products
          this.getCategories()
          const { selectedCategory } = this.$route.params
          if (selectedCategory) {
            this.selectedCategory = selectedCategory
          }
          if (this.selectedCategory !== '') {
            this.pagination = {}
          } else {
            this.setPagination(page)
          }
          this.isLoading = false
        })
        .catch((error) => {
          this.$httpMessageState(error, '連線錯誤')
          this.isLoading = false
        })
    },
    getCategories () {
      const categories = new Set()
      this.products.forEach((product) => {
        categories.add(product.category)
      })
      this.categories = [...categories]
    },
    setPagination (page = 1) {
      const perPage = 12
      this.pagination = {
        total_pages: Math.ceil(this.products.length / perPage),
        current_page: page,
        has_pre: page !== 1,
        has_next: false,
        category: null
      }
      if (this.pagination.current_page >= this.pagination.total_pages) {
        this.pagination.current_page = this.pagination.total_pages
        this.pagination.has_next = false
      } else {
        this.pagination.has_next = true
      }
      const minPage = (this.pagination.current_page * perPage) - perPage
      const maxPage = (this.pagination.current_page * perPage)
      this.products = this.products.slice(minPage, maxPage)
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
          this.emitter.emit('update-cart', id)
          this.loadingStatus.loadingCart = ''
          this.qty = 1
        })
        .catch((error) => {
          this.loadingStatus.loadingCart = ''
          this.$httpMessageState(error, '連線錯誤')
        })
    },
    toggleFavorite (item) {
      if (this.myFavorite.includes(item.id)) {
        this.myFavorite.splice(this.myFavorite.indexOf(item.id), 1)
        this.$httpMessageState({
          data: {
            success: true,
            message: `已將 ${item.title} 移除收藏`
          }
        }, '移除收藏')
      } else {
        this.myFavorite.push(item.id)
        this.$httpMessageState({
          data: {
            success: true,
            message: `已將${item.title}加入收藏`
          }
        }, '加入收藏')
      }
      handleFavorite.storeFavorite(this.myFavorite)
      this.emitter.emit('update-favorite')
    },
    updateFavorite () {
      this.myFavorite = handleFavorite.getFavorite()
      this.getAllProducts()
    }
  },
  watch: {
    selectedCategory (newValue, preValue) {
      if (newValue === '' || preValue === '') {
        this.getAllProducts()
      }
    }
  },
  computed: {
    filterProducts () {
      return this.products.filter((product) => product.category.match(this.selectedCategory))
    }
  },
  mounted () {
    this.$http.defaults.baseURL = process.env.VUE_APP_API
    this.getAllProducts()
    this.emitter.on('update-favorite', this.updateFavorite)
  },
  unmounted () {
    this.emitter.off('update-favorite', this.updateFavorite)
  }
})
</script>
