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
  'update:modelValue': [string]
  remove: [id: number]
  mark: [id: number]
  send: [void]
}>()

const updateNewTodoProxy = computed<string>({
  get: () => modelValue,
  set: (value: string) => emit('update:modelValue', value)
})
</script>

<template>
  <div class="flex flex-col gap-y-12 rounded-[12px]">
    <div class="flex gap-12 items-center">
      <div class="bg-banana-2 w-32 h-32 flex justify-center items-center rounded-[4px]">
        <IconTrash/>
      </div>
      <div class="font-medium">Мои задачи</div>
    </div>

    <div class="flex flex-col gap-[20px] overflow-y-auto">
      <div v-for="todo in todos" :key="todo.id">
        <div class="group flex items-center p-4 gap-12 cursor-pointer rounded-lg transition-colors duration-200">
          <input type="checkbox" class="cursor-pointer" :checked="todo.done" @change="emit('mark', todo.id)">
          <div class="flex-1">{{ todo.text }}</div>

          <IconTrash
              class="ml-auto opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer"
              @click="emit('remove', todo.id)"
          />
        </div>
      </div>
    </div>

    <div class="h-1 bg-grey-2 mb-4"></div>
    <div class="flex gap-12 items-center justify-between">
      <UiInput
          v-model="updateNewTodoProxy"
          placeholder="Добавьте задачу"
          class="flex-grow"
      />
      <UiButton
          class="flex justify-center items-center w-40 h-40 border flex-none p-4 rounded-full cursor-pointer"
          @click="emit('send')">
        >
      </UiButton>
    </div>
  </div>
</template>