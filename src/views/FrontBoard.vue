<template>
  <Icons></Icons>
  <FrontNavbar></FrontNavbar>
  <ToastMessages></ToastMessages>
  <router-view/>
  <Footer></Footer>

</template>

<script>
import FrontNavbar from '../components/FrontNavbar.vue'
import Footer from '../components/Footer.vue'
import emitter from '@/methods/emitter'
import ToastMessages from '@/components/ToastMessages.vue'
import $httpMessageState from '@/methods/pushMessageState'
import handleFavorite from '@/methods/handleFavorite'
import Icons from '@/components/Icons.vue'

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
    FrontNavbar,
    Footer,
    ToastMessages,
    Icons
  },
  provide () {
    return {
      $httpMessageState,
      emitter
    }
  }
}
</script>
