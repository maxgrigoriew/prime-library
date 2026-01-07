<script setup>
import {computed, onMounted} from "vue";
import {authFt} from "@/entities/auth/features/authFf.js";
import {getToday} from "@/shared/date/index.js";
import {useCheckDevice} from "@/entities/device/hooks/useCheckDevice.js";
import {todoListFeature} from "@/entities/todos/features/todoListFeature.js";
import TodoList from "@/entities/todos/ui/DodoList/TodoList.vue";
import {showConfirm} from  "@/ui/UiConfirm/useConfirm.js"
import UiButton from "@/ui/UiButton/UiButton.vue";

const isMobile = useCheckDevice()

const {
  shortName,
  firstName,
} = authFt()

const {
  todoState,
  isLoadingTodoList,
  loadTodoList,
  handleRemoveTodo,
  handleMarkTodo,
  handleSendNewTodo
} = todoListFeature()
const mobileClass = computed(() => isMobile.value && 'mobile')

const confFunction = async () => {
  const result = await showConfirm('hello')

  console.log(result)
}
onMounted(loadTodoList)

</script>
<template>
  <UiButton @click="confFunction">Click</UiButton>
  <div :class="mobileClass" class="grid-layout p-4 gap-20 bg-gray-100">
    <div class="greeting flex flex-col justify-between bg-blue-2 text-white p-[50px] rounded-[12px]">
      <div class="text-2xl font-bold">Привет, {{ firstName }}</div>
      <div>{{ getToday() }}</div>
    </div>

    <div
        class="profile bg-blue-3 rounded-[12px] p-[12px] text-4xl flex justify-center items-center text-white font-bold">
      {{ shortName }}
    </div>
    <div class="funnel shadow-custom bg-white rounded-[12px] p-[12px]">funnel</div>
    <div class="todos shadow-custom bg-white rounded-[12px] p-[12px]">
      <TodoList v-model="todoState.newTodo" :todo-list="todoState.list" :loading="isLoadingTodoList" @remove="handleRemoveTodo" @send="handleSendNewTodo"/>
    </div>
    <div class="calendar shadow-custom  bg-gray-3 rounded-[12px] p-[12px]">calendar</div>

  </div>
</template>

<style scoped>
.grid-layout {
  display: grid;
  grid-template-areas:
    "greeting greeting profile"
    "funnel todos calendar";
  grid-template-columns: 2fr 2fr 1fr;
  grid-template-rows: minmax(240px, 1fr) minmax(0, 3fr);
}

.mobile.grid-layout {
  display: grid;
  grid-template-areas:
    "greeting greeting"
    "profile calendar"
    "funnel todos";
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 200px minmax(200px, 1fr) 1fr;
}

.greeting {
  grid-area: greeting;
}

.profile {
  grid-area: profile;
}

.funnel {
  grid-area: funnel;
}

.todos {
  grid-area: todos;
}

.calendar {
  grid-area: calendar;
}
</style>