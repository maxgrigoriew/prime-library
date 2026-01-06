<script setup>
import {computed, onMounted} from "vue";
import {authFt} from "@/entities/auth/features/authFf.js";
import {getToday} from "@/shared/date/index.js";
import {useCheckDevice} from "@/entities/device/hooks/useCheckDevice.js";
import {todoListFeature} from "@/entities/todos/features/todoListFeature.js";
import TodoList from "@/entities/todos/ui/DodoList/TodoList.vue";

const isMobile = useCheckDevice()

const {
  shortName,
  firstName,
} = authFt()

const {
  todoList,
  loadTodoList,
  removeTodo,
  handleMarkTodo
} = todoListFeature()
const mobileClass = computed(() => isMobile.value && 'mobile')

onMounted(() => {

  loadTodoList()
})

</script>
<template>
  <div :class="mobileClass" class="grid-layout p-4 gap-12 bg-gray-100">
    <div class="greeting flex flex-col justify-between bg-blue-2 text-white p-[50px] rounded-[12px]">
      <div class="text-2xl font-bold">Привет, {{ firstName }}</div>
      <div>{{ getToday() }}</div>
    </div>

    <div
        class="profile bg-blue-3 rounded-[12px] p-[12px] text-4xl flex justify-center items-center text-white font-bold">
      {{ shortName }}
    </div>

    <div class="funnel bg-white rounded-[12px] p-[12px]">funnel</div>
    <div class="todos bg-white rounded-[12px] p-[12px]">
      <TodoList :todos="todoList" @mark="handleMarkTodo" @remove="removeTodo"/>
    </div>
    <div class="calendar bg-gray-3 rounded-[12px] p-[12px]">calendar</div>

  </div>
</template>

<style scoped>
.grid-layout {
  display: grid;
  grid-template-areas:
    "greeting greeting profile"
    "funnel todos calendar";
  grid-template-columns: 2fr 2fr 1fr;
  grid-template-rows: 300px auto;
}

.mobile.grid-layout {
  display: grid;
  grid-template-areas:
    "greeting greeting"
    "profile calendar"
    "funnel todos";
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 200px minmax(200px, auto) auto;
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