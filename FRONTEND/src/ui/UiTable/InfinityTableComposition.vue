<template>
  <div>
    <div class="infinity-table-wrapper" v-if="!notFound">
      <table :class="tableClass">
        <thead>
        <slot name="header"></slot>
        </thead>

        <tbody>
        <slot name="body"></slot>
        </tbody>

        <tfoot>
        </tfoot>
      </table>
    </div>

    <div class="footer">
      <slot name="footer">
        footer
      </slot>
    </div>
  </div>


</template>

<script setup>
import {ref, watch} from 'vue';

const props = defineProps({
  columnCount: {
    type: Number,
    required: true,
  },
  loadNext: {
    type: Function,
    required: true,
  },
  notFound: {
    type: Boolean,
    required: true,
  }
});

// Define refs
const scrollRef = ref(null);

// Define methods
const restart = () => {
  if (scrollRef.value && typeof scrollRef.value.restart === 'function') {
    scrollRef.value.restart();
  }
};

// Watch notFound property
watch(() => props.notFound, (value) => {
  if (!value) {
    restart();
  }
});

// Expose public methods
defineExpose({
  restart
});
</script>

<style lang="scss">

.infinity-table-wrapper {

  @apply rounded-12 overflow-x-hidden overflow-y-auto border border-gray-200;

  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;

  & > table {
    width: 100%;
    height: 100%;
    overflow: unset;
    border-spacing: 0;
    border-collapse: unset;

    & > thead {
      position: sticky;
      top: 0;
      z-index: 2;

      th {
        @apply bg-gray-200 font-medium p-12 text-left align-top text-gray-400;

        &:not(:first-child) {
          border-left: 1px solid white;
        }
      }
    }

    & > tbody {
      overflow-y: auto;
      overflow-x: hidden;
      height: calc(100% - 72px);

      & tr {
        @apply hover:bg-gray-100;
        cursor: pointer;

        & td {
          @apply p-12;

          &:not(:first-child) {
            border-left: 1px solid white;
          }
        }
      }
    }
  }
}

.footer {
  display: flex;
  align-items: center;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;

  min-height: 30px;
  padding: 12px;
  border-top: none;

  @apply bg-gray-200 font-medium p-12 text-gray-400 text-sm;
}
</style>