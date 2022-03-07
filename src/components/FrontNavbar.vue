<template>
    <nav class="navbar navbar-light fixed-top bg-white navbar-expand-lg">
      <div class="container-fluid" ref="myOffcanvas">
        <router-link to="/" class="navbar-brand ps-3">
          <h1 class="title mb-0">VigΩr</h1>
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
            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li class="nav-item">
                <router-link to="/" active-class="" class="nav-link"># Home</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/about" class="nav-link"># About</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/item" class="nav-link"># Item</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/guide" class="nav-link"># Guide</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/favorite" class="nav-link"><i class="bi bi-heart-fill"></i> Favorite</router-link>
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
  mounted () {
    this.offcanvas = new Offcanvas(this.$refs.myOffcanvas)
  }
}
</script>
