<script setup lang="ts">

defineOptions({
  name: 'AppHeaderLink'
})

type Props = {
  to: string
}

defineProps<Props>()
</script>

<template>
  <li>
    <router-link :to="to" class="h-[44px] w-[44px] flex justify-center items-center rounded-[4px] hover:bg-blue-400">
      <slot />
    </router-link>
  </li>
</template>