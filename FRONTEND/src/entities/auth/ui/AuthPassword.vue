<script lang="ts" setup="">

import {ref, computed, useAttrs} from "vue";
import UiInput from "@/ui/UiInput/UiInput.vue";

defineOptions({
  name: 'AuthPassword'
})

const attrs = useAttrs()

const modelValue = defineModel<string>()

const isVisibleIcon = ref(false)

const inputRef = ref<HTMLElement | null>(null)

const currentIcon = computed(() => isVisibleIcon.value ? 'pi pi-eye' : 'pi pi-eye-slash')

const type = computed(() => isVisibleIcon.value ? 'text' : 'password')

const togglePasswordVisible = () => {
  isVisibleIcon.value = !isVisibleIcon.value
}
</script>

<template>
  <div class="relative">
    <UiInput v-model="modelValue" :type="type" title="d" v-bind="attrs" ref="inputRef" inputClasses="pr-32" />

    <div class="absolute h-16 w-16 flex justify-center align-middle right-8 cursor-pointer bottom-8"
         @click="togglePasswordVisible"
    >
      <slot name="icon">
        <i :class="currentIcon"></i>
      </slot>
    </div>

  </div>

</template>