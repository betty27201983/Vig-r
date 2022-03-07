<template id="pagination-template">
  <nav aria-label="Page navigation" v-if="pages.total_pages > 1">
    <ul class="pagination justify-content-center">
      <li class="page-item" v-if="pages.has_pre">
        <a class="page-link" href="#" aria-label="Previous" @click.prevent="updatePage(pages.current_page - 1)">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item" v-for="page in pages.total_pages" :key="page"
      :class="{ 'active': page === pages.current_page }">
        <a class="page-link" href="#" @click.prevent="updatePage(page)">
          {{ page }}
        </a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Next"
          v-if="pages.has_next"
          @click.prevent="updatePage(pages.current_page + 1)">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
// :pages="{ 頁碼資訊 }"
// @emitPages="更新頁面事件"
export default {
  props: ['pages'],
  emits: ['update-page'],
  template: '#pagination-template',
  methods: {
    updatePage (page) {
      if (this.pages.current_page === page) return
      this.$emit('update-page', page)
    }
  }
}
</script>
