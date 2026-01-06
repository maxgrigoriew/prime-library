<script lang="ts" setup="">

import type {Todo} from "@/entities/todos/types/types.ts";
import IconTrash from '@/assets/icons/trash.svg?component'
import UiInput from "@/ui/UiInput/UiInput.vue";
import UiButton from "@/ui/UiButton/UiButton.vue";
import {computed} from "vue";

defineOptions({
  name: 'TodoList'
})

type Props = {
  todos: Todo[]
  modelValue: string
}

const {todos, modelValue} = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue' : [string]
  remove: [id: number]
  mark: [id: number]
  send: [void]
}>()

const updateNewTodoProxy = computed<string>( {
  get: () => modelValue,
  set: (value: string) => emit('update:modelValue', value)
})
</script>

<template>
  <div class="flex flex-col gap-y-12 rounded-[8px] border p-12">
    <div v-for="todo in todos" :key="todo.id">
      <div class="flex p-4 gap-12 align-middle cursor-pointer border border-b-grey-2 rounded">
        <input type="checkbox" class="cursor-pointer" :checked="todo.done" @change="emit('mark', todo.id)">
        <div>{{ todo.text }}</div>
        <IconTrash class="ml-auto" @click="emit('remove', todo.id)"/>
      </div>
    </div>

    <div class="flex gap-12 items-center justify-between ">
      <UiInput
          v-model="updateNewTodoProxy"
          placeholder="Добавьте задачу"
      />
      <UiButton
          class="flex justify-center items-center w-40 h-40 border flex-none p-4 rounded-full cursor-pointer"
          @click="emit('send')">
        >
      </UiButton>
    </div>
  </div>
</template>
