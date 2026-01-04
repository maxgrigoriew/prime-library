import type {Todo} from '../types/types.ts'
import {createGlobalState} from "@vueuse/core";
import {type Ref, ref} from "vue";

export type TodoListStoreReturn = {
    todoList: Ref<Todo[]>
    setTodos: (todos: Todo[]) => void
}

export const useTodoListStore = createGlobalState((): TodoListStoreReturn => {
    const todoList = ref<Todo[]>([]);

    const setTodos = (todos: Todo[]) => {
        todoList.value = todos
    }

    return {
        todoList,
        setTodos
    }
})