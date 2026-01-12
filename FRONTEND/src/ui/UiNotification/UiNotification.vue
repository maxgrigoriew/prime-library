<script lang="ts" setup="">
import {computed, ref} from 'vue'

import IconInfo from '@/assets/icons/info.svg?component';
import IconError from '@/assets/icons/help.svg?component';

defineOptions({
  name: 'UiNotification',
  inheritAttrs: false,
  components: {
    IconError,
    IconInfo
  }
})

type Icon = 'info' | 'error'
type Type = 'info' | 'error'
type Sticky = 'top' | 'left' | 'right' | 'bottom'

type Props = {
  icon: Icon
  type: Type
  isCollapsed?: boolean
  sticky?: Sticky
}

const {
  type = 'info',
  icon = 'error',
  isCollapsed = false,
  sticky = 'top',
} = defineProps<Props>()

const THEME_CLASS = {
  'info': 'blue-2',
  'error': 'red-100',
}

const ICON_CLASS = {
  'info': 'IconInfo',
  'error': 'IconError',
}

const isOpened = ref(false)

const currentIcon = computed(() => ICON_CLASS[icon])
const currentTheme = computed(() => `bg-${THEME_CLASS[type]}`)
const stickyClass = computed(() => `sticky-${sticky}`)


const handleChangeOpened = () => {
  isOpened.value = !isOpened.value
}

</script>

<template>
  <div class="notification" :class="[{open: isOpened}, stickyClass]" >
    <div :class="currentTheme" class="main flex gap-12 text-white p-12">
      <div class="icon">
        <slot name="icon">
          <component :is="currentIcon"/>
        </slot>
      </div>
      <div class="contend">
        <slot/>
      </div>
      <div v-if="isCollapsed" class="ml-auto cursor-pointer" @click="handleChangeOpened">
        >
      </div>
    </div>
    <div v-show="isOpened" class="collapsed p-12">
      <slot name="collapse"/>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.notification {
  @apply rounded-8 overflow-hidden;

  &.open {
    @apply shadow-custom;

    & .main {
      @apply rounded-bl-none rounded-br-none;
    }
  }

  &.sticky-top {
    @apply rounded-tr-none rounded-tl-none;
  }

  &.sticky-right {
    @apply rounded-br-none rounded-tr-none;
  }

  &.sticky-bottom {
    @apply rounded-br-none rounded-bl-none;
  }

  &.sticky-left {
    @apply rounded-bl-none rounded-tl-none;
  }


}
</style>