<script lang="ts" setup="">
import {ref} from 'vue'

defineOptions({
  name: 'UiTestTooltip'
})

type Props = {
  isHover: boolean
}

const {
  isHover = false
} = defineProps<Props>()

const isVisible = ref(false)

const show = () => {
  console.log('show')
  if (isHover) {

  }
  isVisible.value = true
}

const hide = () => {
  isVisible.value = false
}
</script>

<template>
  <div class="tooltip-wrapper">
    <div class="trigger"
         @click="show"
         @mouseenter="show"
    >
      <slot name="trigger"></slot>
    </div>

    <div v-if="isVisible" class="content">
      <slot>
        content
      </slot>
    </div>

  </div>
</template>

<style scoped>

</style>