<template>
<Loading :active="isLoading"></Loading>
    <div class="container notoTC" style="margin-top: 133px; margin-bottom: 80px">
        <div class="position-relative m-5">
            <div class="progress" style="height: 1px;">
              <div class="progress-bar" role="progressbar" style="width: 50%;" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <div class="position-absolute top-0 start-0 translate-middle bg-primary text-center p-1 text-white rounded-pill" style="width: 2rem; height:2rem;">1</div>
            <div class="position-absolute top-0 start-50 translate-middle bg-primary text-center p-1 text-white rounded-pill" style="width: 2rem; height:2rem;">2</div>
            <div class="position-absolute top-0 start-100 translate-middle bg-secondary text-center p-1 text-white rounded-pill" style="width: 2rem; height:2rem;">3</div>
        </div>

        <h2><i class="bi bi-brush-fill pe-2"></i>購物車<span class="fs-6 text-muted">/填寫資料</span></h2>
        <div class="my-5 row justify-content-center">
        <Form class="col-md-10" v-slot="{ errors }"
                @submit="createOrder">
            <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <Field id="email" name="email" type="email" class="form-control"
                    :class="{ 'is-invalid': errors['email'] }"
                    placeholder="請輸入 Email" rules="email|required"
                    v-model="form.user.email"></Field>
            <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
            </div>

            <div class="mb-3">
            <label for="name" class="form-label">收件人姓名</label>
            <Field id="name" name="姓名" type="text" class="form-control"
                    :class="{ 'is-invalid': errors['姓名'] }"
                    placeholder="請輸入姓名" rules="required"
                    v-model="form.user.name"></Field>
            <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
            </div>

            <div class="mb-3">
            <label for="tel" class="form-label">收件人電話</label>
            <Field id="tel" name="電話" type="tel" class="form-control"
                    :class="{ 'is-invalid': errors['電話'] }"
                    placeholder="請輸入電話" rules="required"
                    v-model="form.user.tel"></Field>
            <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
            </div>

            <div class="mb-3">
            <label for="address" class="form-label">收件人地址</label>
            <Field id="address" name="地址" type="text" class="form-control"
                    :class="{ 'is-invalid': errors['地址'] }"
                    placeholder="請輸入地址" rules="required"
                    v-model="form.user.address"></Field>
            <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
            </div>

            <div class="mb-3">
            <label for="message" class="form-label">留言</label>
            <textarea name="" id="message" class="form-control" cols="30" rows="10"
                        v-model="form.message"></textarea>
            </div>
            <div class="text-end">
              <router-link class="btn btn-outline-primary me-3" to="/cart">
                    <i class="bi bi-caret-left-fill"></i>
                    上一步
              </router-link>
              <button class="btn btn-danger">
                <i class="bi bi-check-lg"></i>
                送出訂單
              </button>
            </div>
        </Form>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      products: [],
      cart: {},
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      isLoading: false
    }
  },
  inject: ['$httpMessageState', 'emitter'],
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
    getCart () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.isLoading = true
      this.$http.get(url).then((response) => {
        console.log(response)
        this.cart = response.data.data
        this.isLoading = false
      })
    },
    createOrder () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`
      const order = this.form
      this.isLoading = true
      this.$http.post(url, { data: order })
        .then((res) => {
          console.log(res)
          this.isLoading = false
          const { orderId } = res.data
          this.$router.push(`/checkout/${orderId}`)
        })
        .catch((error) => {
          this.$httpMessageState(error, '連線錯誤')
          this.isLoading = false
        })
    }
  },
  mounted () {
    this.getProducts()
    this.getCart()
  }
}
</script>
