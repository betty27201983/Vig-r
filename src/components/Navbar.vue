<template>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid" ref="myOffcanvas">
    <router-link to="/dashboard/products" class="navbar-brand ps-3">
      <h1 class="title mb-0">VigΩr</h1>
      <figcaption class="blockquote-footer mb-0 mt-2">Something important in <cite title="後台管理系統">後台管理系統</cite>
      </figcaption>
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="offcanvas offcanvas-end ps-5" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
      <div class="offcanvas-header">
        <h3 class="offcanvas-title fw-bold" id="offcanvasNavbarLabel">VigΩr</h3>
        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <ul class="navbar-nav justify-content-end align-items-center flex-grow-1 pe-3">
          <li class="nav-item me-3">
            <router-link to="/dashboard/products" class="nav-link"># 產品</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/dashboard/orders" class="nav-link"># 訂單</router-link>
          </li>
          <li class="nav-item mx-3">
            <router-link to="/dashboard/coupons" class="nav-link"># 優惠券</router-link>
          </li>
          <li class="nav-item mx-3">
            <button type="button" class="nav-link btn btn-danger text-white px-3" href="#" @click.prevent="logOut">登出</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</nav>
</template>

<script>
import Offcanvas from 'bootstrap/js/dist/offcanvas'

export default {
  methods: {
    logOut () {
      const api = `${process.env.VUE_APP_API}logout`
      this.$http.post(api, this.user)
        .then((res) => {
          if (res.data.success) {
            this.$router.push('/login')
          }
        })
    }
  },
  mounted () {
    this.offcanvas = new Offcanvas(this.$refs.myOffcanvas)
  }
}
</script>
