<script lang="ts" setup="">

import {ref, computed} from "vue";
import {UiInput} from "@/ui";

defineOptions({
  name: 'AuthPassword'
})


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
    <UiInput v-model="modelValue" :type="type" v-bind="$props" ref="inputRef" inputClasses="pr-32" />

    <div class="absolute right-8 top-1/2 -translate-y-1/2 cursor-pointer "
         @click="togglePasswordVisible"
    >
      <slot name="icon">
        <i :class="currentIcon"></i>
      </slot>
    </div>

  </div>

</template>