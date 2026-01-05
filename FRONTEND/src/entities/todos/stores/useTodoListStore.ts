import type {Todo} from '../types/types.ts'
import {createGlobalState} from "@vueuse/core";
import {type Ref, ref} from "vue";

export type TodoListStoreReturn = {
    todoList: Ref<Todo[]>
    setTodos: (todos: Todo[]) => void
    removeTodoById: (id: number) => void
}

export const useTodoListStore = createGlobalState((): TodoListStoreReturn => {
    const todoList = ref<Todo[]>([]);

    const setTodos = (todos: Todo[]) => {
        todoList.value = todos
    }

    const removeTodoById = (id: number) => {
        todoList.value = todoList.value.filter((todo: Todo) => todo.id !== id)
    }

    return {
        todoList,
        setTodos,
        removeTodoById
    }
})