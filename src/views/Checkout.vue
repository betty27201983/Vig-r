<template>
  <Loading :active="isLoading"></Loading>
  <div class="container notoTC" style="margin-top: 133px; margin-bottom: 100px">
    <div class="position-relative m-5">
            <div class="progress" style="height: 1px;">
              <div class="progress-bar" role="progressbar" style="width: 100%;" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <div class="position-absolute top-0 start-0 translate-middle bg-primary text-center p-1 text-white rounded-pill" style="width: 2rem; height:2rem;">1</div>
            <div class="position-absolute top-0 start-50 translate-middle bg-primary text-center p-1 text-white rounded-pill" style="width: 2rem; height:2rem;">2</div>
            <div class="position-absolute top-0 start-100 translate-middle bg-primary text-center p-1 text-white rounded-pill" style="width: 2rem; height:2rem;">3</div>
    </div>

    <h2><i class="bi bi-clipboard-check-fill pe-2"></i>購物車<span class="fs-6 text-muted">/確認訂單並付款</span></h2>

    <div class="row justify-content-center">
      <form class="col-md-6" @submit.prevent="payOrder">
        <table class="table align-middle">
          <thead>
          <th>品名</th>
          <th>數量</th>
          <th>單價</th>
          </thead>
          <tbody>
          <tr v-for="item in order.products" :key="item.id">
            <td>{{ item.product.title }}</td>
            <td>{{ item.qty }}/{{ item.product.unit }}</td>
            <td class="text-end">{{ item.final_total }}</td>
          </tr>
          </tbody>
          <tfoot>
          <tr>
            <td colspan="2" class="text-end">總計</td>
            <td class="text-end">{{ order.total }}</td>
          </tr>
          </tfoot>
        </table>

        <table class="table">
          <tbody>
          <tr>
            <th width="100">Email</th>
            <td>{{ order.user.email }}</td>
          </tr>
          <tr>
            <th>姓名</th>
            <td>{{ order.user.name }}</td>
          </tr>
          <tr>
            <th>收件人電話</th>
            <td>{{ order.user.tel }}</td>
          </tr>
          <tr>
            <th>收件人地址</th>
            <td>{{ order.user.address }}</td>
          </tr>
          <tr>
            <th>付款狀態</th>
            <td>
              <span v-if="!order.is_paid">尚未付款</span>
              <span v-else class="text-success">付款完成</span>
            </td>
          </tr>
          </tbody>
        </table>
        <div class="text-end" v-if="order.is_paid === false">
          <button class="btn btn-danger">確認付款去</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      order: {
        user: {}
      },
      orderId: '',
      isLoading: false
    }
  },
  methods: {
    getOrder () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order/${this.orderId}`
      this.$http.get(url)
        .then((res) => {
          if (res.data.success) {
            this.order = res.data.order
            console.log(this.order)
          }
        })
    },
    payOrder () {
      const id = this.$route.params.orderId
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/pay/${this.orderId}`
      this.$http.post(url)
        .then((res) => {
          console.log(res)
          if (res.data.success) {
            this.getOrder()
          }
          this.$router.push({ path: `/checkoutSuccess/${id}` })
        })
    }
  },
  created () {
    this.orderId = this.$route.params.orderId
    console.log(this.orderId)
    this.getOrder()
  }
}
</script>
