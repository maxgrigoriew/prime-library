import type {Todo} from '../types/types.ts'
import {createGlobalState} from "@vueuse/core";
import {type Ref, ref} from "vue";

export type TodoListStoreReturn = {
    todoList: Ref<Todo[]>
    setTodos: (todos: Todo[]) => void
    removeTodoById: (id: number) => void
    markTodoById: (id: number) => void
}

export const useTodoListStore = createGlobalState((): TodoListStoreReturn => {
    const todoList = ref<Todo[]>([]);

    const setTodos = (todos: Todo[]) => {
        todoList.value = todos
    }

    const removeTodoById = (id: number) => {
        const index = todoList.value.findIndex((todo: Todo) => todo.id === id)
        if (index === -1) {
            return
        }
        todoList.value.splice(index, 1)
    }

    const markTodoById = (id: number) => {
        const todo = todoList.value.find((todo: Todo) => todo.id === id);

        if (!todo) {
            return
        }

        todo.done = !todo.done
    };

    return {
        todoList,
        setTodos,
        removeTodoById,
        markTodoById
    }
})