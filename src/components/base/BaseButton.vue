<template>
  <button :class="buttonClasses" :disabled="disabled || loading">
    <span v-if="loading" class="loader mr-2"></span>

    <span v-if="icon && iconPosition === 'left'" class="mr-2">
      <slot name="icon" />
    </span>

    <span v-if="!iconOnly">
      <slot />
    </span>

    <span v-if="icon && iconPosition === 'right'" class="ml-2">
      <slot name="icon" />
    </span>
  </button>
</template>

<script setup lang="js">
import { computed } from 'vue'

// eslint-disable-next-line no-undef
const props = defineProps({
  variant: {
    type: String,
    default: 'primary', // primary, secondary, tertiary, link
  },
  color: {
    type: String,
    default: 'blue', // blue or red
  },
  outline: Boolean,
  disabled: Boolean,
  loading: Boolean,
  icon: Boolean,
  iconOnly: Boolean,
  iconPosition: {
    type: String,
    default: 'left', // or 'right'
  }
})

const buttonClasses = computed(() => {
  const base = 'inline-flex items-center font-medium rounded px-4 py-2 transition focus:outline-none focus:ring-2 focus:ring-offset-2 text-sm'
  const disabledClass = (props.disabled || props.loading) ? 'opacity-50 cursor-not-allowed' : ''

  const colors = {
    primary: {
      blue: props.outline
        ? 'text-primary-blue border border-primary-blue hover:bg-primary-blue hover:text-white'
        : 'bg-primary-blue text-white hover:bg-blue-600',
      red: props.outline
        ? 'text-primary-red border border-primary-red hover:bg-primary-red hover:text-white'
        : 'bg-primary-red text-white hover:bg-red-600',
    },
    secondary: 'bg-base-pink text-primary-red hover:bg-red-100',
    tertiary: 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100',
    link: 'text-primary-blue hover:underline'
  }

  let variantClass = ''

  if (props.variant === 'primary') {
    variantClass = colors.primary[props.color]
  } else if (props.variant === 'secondary') {
    variantClass = colors.secondary
  } else if (props.variant === 'tertiary') {
    variantClass = colors.tertiary
  } else if (props.variant === 'link') {
    variantClass = colors.link
  }

  return [base, variantClass, disabledClass].join(' ')
})
</script>

<style scoped>
.loader {
  border: 2px solid #f3f3f3;
  border-top: 2px solid #3498db;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: spin 0.8s linear infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
