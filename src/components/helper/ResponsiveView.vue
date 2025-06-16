<script setup>
import { ref, onMounted } from 'vue'

// eslint-disable-next-line no-undef
const props = defineProps({
  mobileOnly: { type: Boolean, default: false },
  desktopOnly: { type: Boolean, default: false },
  delay: { type: Number, default: 0 },
})

const isMobile = ref(window.innerWidth < 768)
const show = ref(false)

const checkDevice = () => {
  isMobile.value = window.innerWidth < 768
}

onMounted(() => {
  window.addEventListener('resize', checkDevice)
  checkDevice()

  if ((props.mobileOnly && isMobile.value) || (props.desktopOnly && !isMobile.value) || (!props.mobileOnly && !props.desktopOnly)) {
    setTimeout(() => {
      show.value = true
    }, props.delay)
  }
})
</script>

<template>
  <div v-if="show">
    <slot />
  </div>
</template>
