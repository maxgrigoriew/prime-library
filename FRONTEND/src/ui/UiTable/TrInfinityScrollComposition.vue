<template>
  <tr ref="sentinelRef" class="tr-infinity-scroll" :class="{ loaded: !showLoader }">
    <td :colspan="colspan">
      loader
<!--      <Loader v-show="showLoader"/>-->
    </td>
  </tr>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue';
// import { throttleAsync } from '@dsee/util/async.js';

// Define props
const props = defineProps({
  root: {
    type: [Element, String],
  },
  docRoot: {
    type: Boolean,
    default: false,
  },
  rootMargin: {
    type: String,
    default: '50px',
  },
  threshold: {
    type: [Number, Array],
    default: 0,
  },
  loadNext: {
    type: Function,
    required: true,
  },
  colspan: {
    type: Number,
    required: true,
  },
});

// Reactive data
const loading = ref(false);
const hasNext = ref(true);
let observer = null;
let unwatch = null;

// Create throttled function
const next = throttleAsync(async () => {
  if (loading.value && hasNext.value && sentinelRef.value && sentinelRef.value.offsetParent != null) {
    hasNext.value = await props.loadNext();
    setTimeout(() => next(), 200);
  }
}, 100);

// Computed properties
const target = computed(() => {
  if (props.docRoot)
    return document;

  if (props.root == null)
    return null;

  if (props.root instanceof Element)
    return props.root;

  if (!props.root)
    throw new Error('Property `root` is not specified');

  const element = sentinelRef.value?.closest(props.root);
  if (!element)
    throw new Error('No element with selector `' + props.root + '` is found in document');

  return element;
});

const showLoader = computed(() => {
  return hasNext.value && loading.value;
});

// Methods
const observe = async () => {
  if (observer != null || !target.value)
    return;

  const options = {
    root: target.value,
    rootMargin: props.rootMargin,
    threshold: props.threshold,
  };

  const handler = ([entry]) => {
    if (entry.isIntersecting && hasNext.value) {
      loading.value = true;
      next();
    } else {
      loading.value = false;
    }
  };

  observer = new IntersectionObserver(handler, options);
  observer.observe(sentinelRef.value);
};

const disconnect = () => {
  if (observer != null) {
    observer.disconnect();
  }
  observer = null;
};

const restart = () => {
  loading.value = true;
  hasNext.value = true;
  next();
};

// Template ref
const sentinelRef = ref(null);

// Lifecycle hooks
onMounted(() => {
  observe();
  // Watch for changes in docRoot and root props
  unwatch = watch([() => props.docRoot, () => props.root], () => {
    disconnect();
    nextTick(() => {
      observe();
    });
  });
});

onUnmounted(() => {
  disconnect();
  if (unwatch) {
    unwatch();
  }
});

// Expose public methods
defineExpose({
  restart
});
</script>

<style lang="scss" scoped>
.tr-infinity-scroll {

  &:hover {
    background: unset;
  }

  td {
    border-top: 1px solid #E8E8EA;
    border-bottom-left-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
  }

  &.loaded {
    td {
      border-top: unset;
      padding:    0;
    }
  }

  td:last-child, th:last-child {
    border-right: unset;
  }

  td:first-child, th:first-child {
    border-left: unset;
  }
}
</style>