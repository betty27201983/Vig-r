<template>
<Loading :active="isLoading"></Loading>
<table class="table mt-4 table-striped">
  <thead>
    <tr>
      <th>購買時間</th>
      <th>Email</th>
      <th>購買款項</th>
      <th>應付金額</th>
      <th>是否付款</th>
      <th>編輯</th>
    </tr>
  </thead>
  <tbody>
    <template v-for="(item, key) in orders" :key="key">
    <tr v-if="orders.length" :class="{'text-secondary': !item.is_paid}">
      <td>{{ $filters.date(item.create_at) }}</td>
      <td><span v-text="item.user.email" v-if="item.user"></span></td>
      <td>
        <ul class="list-unstyled">
            <li v-for="(product, i) in item.products" :key="i">
                {{ product.product.title }} 數量： {{ product.qty }} {{ product.product.unit }}
            </li>
        </ul>
      </td>
      <td class="text-right">
        {{ $filters.currency(item.total) }}
      </td>
      <td>
        <div class="form-check form-switch">
          <input class="form-check-input" type="checkbox" role="switch" :id="`paidSwitch${item.id}`" v-model="item.is_paid">
          <label class="form-check-label" :for="`paidSwitch${item.id}`">
            <span class="text-success" v-if="item.is_paid">已付款</span>
            <span class="text-muted" v-else>未付款</span>
          </label>
        </div>
      </td>
      <td>
        <div class="btn-group">
          <button class="btn btn-outline-primary btn-sm" @click="openModal(false, item)">編輯</button>
          <button class="btn btn-outline-danger btn-sm" @click="openDelOrderModal(item)">刪除</button>
        </div>
      </td>
    </tr>
    </template>
  </tbody>
</table>

<OrderModal :order="tempOrder" ref="OrderModal" @update-paid="updatePaid"></OrderModal>
<Pagination :pages="pagination" @update-page="getOrders"></Pagination>
<DelModal :item="tempOrder" ref="delModal" @del-item="delOrder"></DelModal>
</template>

<script>
import DelModal from '@/components/DelModal.vue'
import OrderModal from '@/components/OrderModal.vue'
import Pagination from '@/components/Pagination.vue'

export default {
  data () {
    return {
      orders: {},
      isNew: false,
      pagination: '',
      current_page: 1,
      isLoading: false,
      tempOrder: {}
    }
  },
  components: {
    Pagination,
    DelModal,
    OrderModal
  },
  inject: ['$httpMessageState'],
  methods: {
    getOrders (page = this.current_page) {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`
      this.$http.get(api)
        .then((response) => {
          if (!response.data.success) {
            this.$httpMessageState(response, '取得訂單')
            this.isLoading = false
            return
          }
          this.orders = response.data.orders
          this.pagination = response.data.pagination
          this.current_page = response.data.pagination.current_page
          if (this.pagination.total_pages > 1) {
            for (let i = 2; i <= this.pagination.total_pages; i += 1) {
              this.$http.get(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders?page=${i}`)
                .then((res) => {
                  if (!res.data.success) {
                    this.$httpMessageState(response, '取得訂單')
                    this.isLoading = false
                  }
                })
            }
          }
          this.isLoading = false
        })
        .catch((error) => {
          this.$httpMessageState(error, '連線錯誤')
          this.isLoading = false
        })
    },
    openModal (isNew, item) {
      this.tempOrder = { ...item }
      this.isNew = false
      const orderComponent = this.$refs.OrderModal
      orderComponent.showModal()
    },
    openDelOrderModal (item) {
      this.tempOrder = { ...item }
      const delComponent = this.$refs.delModal
      delComponent.showModal()
    },
    updatePaid (item) {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${item.id}`
      const paid = {
        is_paid: item.is_paid
      }
      this.$http.put(api, { data: paid }).then((response) => {
        this.isLoading = false
        this.getOrders(this.currentPage)
        this.$httpMessageState(response, '更新付款狀態')
      })
    },
    delOrder () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${this.tempOrder.id}`
      this.isLoading = true
      this.$http.delete(url).then((response) => {
        console.log(response)
        const delComponent = this.$refs.delModal
        delComponent.hideModal()
        this.getOrders(this.currentPage)
      })
    }
  },
  created () {
    this.getOrders()
    console.log(process.env.VUE_APP_API)
  }
}
</script>
