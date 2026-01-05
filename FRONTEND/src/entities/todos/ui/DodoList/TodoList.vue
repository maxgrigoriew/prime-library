<script lang="ts" setup="">

import type {Todo} from "@/entities/todos/types/types.ts";
import IconTrash from '@/assets/icons/trash.svg?component'

defineOptions({
  name: 'TodoList'
})

type Props = {
  todos: Todo[]
}

const {todos} = defineProps<Props>()

const emit = defineEmits<{
  remove: [id: number]
}>()
</script>

<template>
  <div class="flex flex-col gap-y-12">
    <div v-for="todo in todos" :key="todo.id">
      <div class="flex p-4 gap-12 align-middle cursor-pointer border border-b-grey-2 rounded">
        <input type="checkbox" class="cursor-pointer">
        <div>{{todo.text}}</div>
        <IconTrash class="ml-auto" @click="emit('remove', todo.id)"/>
      </div>
    </div>
  </div>

</template>
