<template>
    <div class="toast-container" style="z-index: 1050; margin-top: 83px; position: fixed; top: 15px; right: 15px;">
        <Toast v-for="(msg, key) in messages" :key="key"
      :msg="msg"></Toast>
    </div>
</template>

<script>
import Toast from '@/components/Toast.vue'

export default {
  components: { Toast },
  data () {
    return {
      messages: []
    }
  },
  inject: ['emitter'],
  mounted () {
    this.emitter.on('push-message', (message) => {
      const { style = 'success', title, content } = message
      this.messages.push({ style, title, content })
    })
  }
}
</script>
