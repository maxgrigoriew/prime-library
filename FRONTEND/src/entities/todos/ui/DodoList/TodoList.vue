<script lang="ts" setup="">

import type {Todo} from "@/entities/todoList/types/types.ts";
import UiInput from "@/ui/UiInput/UiInput.vue";
import UiButton from "@/ui/UiButton/UiButton.vue";
import {computed} from "vue";

defineOptions({
  name: 'TodoList'
})

type Props = {
  todoList: Todo[]
  modelValue: string
  isLoadingTodoMarking: boolean
  isLoadingTodoList: boolean
}

const {todoList, modelValue, isLoadingTodoMarking, isLoadingTodoList} = defineProps<Props>()

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
      <div class="bg-banana-1 w-32 h-32 flex justify-center items-center rounded-[4px]">
        <i class="pi pi-thumbtack"></i>
      </div>
      <div class="font-medium">Мои задачи</div>
    </div>
    <div class="flex flex-col overflow-y-auto">
      <div v-for="todo in todoList" :key="todo.id">
        <div class="group flex items-center py-12 gap-12 cursor-pointer rounded-lg transition-colors duration-200">
          <input type="checkbox" class="cursor-pointer" :disabled="isLoadingTodoMarking" :checked="todo.done"
                 @change="emit('mark', todo.id)">
          <div class="flex-1">{{ todo.text }}</div>


          <i class="pi pi-thumbtack ml-auto opacity-0 group-hover:opacity-100 transition-all duration-100 cursor-pointer"
              @click="emit('remove', todo.id)"
          />
        </div>
      </div>
    </div>

    <div class="h-1 bg-gray-200 mb-4 mt-auto"></div>
    <div class="flex gap-12 items-center justify-between">
      <UiInput
          v-model="updateNewTodoProxy"
          placeholder="Добавьте задачу"
          class="flex-grow"
          @keydown.enter.prevent.exact="emit('send')"
      />
      <UiButton
          :disabled="!updateNewTodoProxy || isLoadingTodoList"
          class="flex justify-center items-center w-40 h-40 border flex-none p-4 rounded-full cursor-pointer bg-gray-400"
          @click="emit('send')">
        <i class="pi pi-angle-right" />
      </UiButton>
    </div>
  </div>
</template>