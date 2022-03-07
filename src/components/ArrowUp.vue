<template>
    <!-- 回到頂部 -->
    <div class="p-3 d-block"
      @click="goTop()" v-if="btnFlag" title="arrow-up" style="cursor: pointer;">
    <img src="~@/../src/assets/images/arrow-up.png" alt="arrow-up"></div>
</template>

<script>
export default {
  data () {
    return {
      scrollNum: 0, // 滾動距離
      isTop: false, // 是否顯示回到頂部按鈕
      btnFlag: true
    }
  },
  mounted () {
    window.addEventListener('scroll', () => {
      const top =
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        window.pageYOffset
      this.scrollNum = top
      if (top > 100) {
        this.btnFlag = true
      } else {
        this.btnFlag = false
      }
    })
  },
  unmounted () {
    window.removeEventListener('scroll', this.scrollToTop)
  },
  methods: {
    goTop () {
      document.documentElement.scrollTop = 0
    }
  }
}
</script>
