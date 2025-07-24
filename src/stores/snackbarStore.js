import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSnackbarStore = defineStore('snackbar', () => {
  const message = ref('')
  const type = ref('info')
  const visible = ref(false)
  let timer = null

  function trigger(msg, t = 'info', duration = 3000) {
    message.value = msg
    type.value = t
    visible.value = true
    clearTimeout(timer)
    timer = setTimeout(() => {
      visible.value = false
    }, duration)
  }

  return { message, type, visible, trigger }
})
