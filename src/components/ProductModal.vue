<template>
<Loading :active="isLoading"></Loading>
<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modal">

<div class="modal-dialog modal-xl" role="document">
  <div class="modal-content border-0 rounded-2">
    <div class="modal-header bg-dark text-white rounded-2">
      <h5 class="modal-title" id="exampleModalLabel">
        <span>新增產品</span>
      </h5>
      <button type="button" class="btn-close"
              data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
      <div class="row">
        <div class="col-sm-4">
          <div class="mb-3">
            <label for="image" class="form-label">輸入圖片網址</label>
            <input type="text" class="form-control" id="image"
                    placeholder="請輸入圖片連結" v-model="tempProduct.imageUrl">
          </div>
          <div class="mb-3">
            <label for="customFile" class="form-label">或 上傳圖片
              <i class="fas fa-spinner fa-spin"></i>
            </label>
            <input type="file" id="customFile" class="form-control"
            ref="fileInput"
            @change="uploadFile">
          </div>
          <img class="img-fluid" alt="" :src="tempProduct.imageUrl">
          <!-- 延伸技巧，多圖 -->
          <div class="mt-5" v-if="tempProduct.images">
            <div class="mb-3 input-group" v-for="(image, key) in tempProduct.images" :key="key">
              <input type="url" class="form-control form-control"
                      placeholder="請輸入連結" v-model="tempProduct.images[key]">
              <button type="button" class="btn btn-outline-danger" @click="tempProduct.images.splice(key, 1)">
                移除
              </button>
            </div>
            <div v-if="tempProduct.images[tempProduct.images.length - 1] || !tempProduct.images.length">
              <button class="btn btn-outline-primary btn-sm d-block w-100" @click="tempProduct.images.push('')">
                新增圖片
              </button>
            </div>
          </div>
        </div>

        <div class="col-sm-8">
          <div class="mb-3">
            <label for="title" class="form-label">標題</label>
            <input type="text" class="form-control" id="title"
                    placeholder="請輸入標題" v-model="tempProduct.title">
          </div>

          <div class="row gx-2">
            <div class="mb-3 col-md-6">
              <label for="category" class="form-label">分類</label>
              <input type="text" class="form-control" id="category"
                      placeholder="請輸入分類" v-model="tempProduct.category">
            </div>
            <div class="mb-3 col-md-6">
              <label for="price" class="form-label">單位</label>
              <input type="text" class="form-control" id="unit"
                      placeholder="請輸入單位" v-model="tempProduct.unit">
            </div>
          </div>

          <div class="row gx-2">
            <div class="mb-3 col-md-6">
              <label for="origin_price" class="form-label">原價</label>
              <input type="number" class="form-control" id="origin_price"
                      placeholder="請輸入原價" v-model.number="tempProduct.origin_price">
            </div>
            <div class="mb-3 col-md-6">
              <label for="price" class="form-label">售價</label>
              <input type="number" class="form-control" id="price"
                      placeholder="請輸入售價" v-model.number="tempProduct.price">
            </div>
          </div>
          <hr>

          <div class="mb-3">
            <label for="description" class="form-label">產品描述</label>
            <textarea type="text" class="form-control" id="description"
                      placeholder="請輸入產品描述" v-model="tempProduct.description"></textarea>
          </div>
          <div class="mb-3">
            <label for="content" class="form-label">說明內容</label>
            <textarea type="text" class="form-control" id="content"
                      placeholder="請輸入產品說明內容" v-model="tempProduct.content"></textarea>
          </div>
          <div class="mb-3">
            <div class="form-check">
              <input class="form-check-input" type="checkbox"
                      :true-value="1"
                      :false-value="0"
                      id="is_enabled" v-model="tempProduct.is_enabled">
              <label class="form-check-label" for="is_enabled">
                是否啟用
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-secondary"
              data-bs-dismiss="modal">取消
      </button>
      <button type="button" class="btn btn-primary" @click="$emit('update-product' ,tempProduct)">確認</button>
    </div>
  </div>
</div>
</div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin'

export default {
  emits: ['updateProduct'],
  props: {
    product: {
      type: Object,
      default () { return {} }
    }
  },
  watch: {
    product () {
      this.tempProduct = this.product
      // 多圖
      if (!this.tempProduct.images) {
        this.tempProduct.images = []
      }
    }
  },
  data () {
    return {
      modal: {},
      tempProduct: {},
      isLoading: false
    }
  },
  methods: {
    uploadFile () {
      const uploadFile = this.$refs.fileInput.files[0]
      const formData = new FormData() // 新增表單
      formData.append('file-to-upload', uploadFile) // 新增一個欄位
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/upload`
      this.isLoading = true
      this.$http.post(url, formData)
        .then((res) => {
          this.isLoading = false
          console.log(res.data)
          if (res.data.success) {
            this.tempProduct.imageUrl = res.data.imageUrl
          }
        })
    }
  },
  mixins: [modalMixin]
}
</script>
