import type {Todo} from '../types/types.ts'
import {createGlobalState} from "@vueuse/core";
import {type Ref, ref} from "vue";

export type TodoListStoreReturn = {
    todoList: Ref<Todo[]>
    newTodo: Ref<string>
    setTodos: (todos: Todo[]) => void
    setTodo: (todo: string) => void
    removeTodoById: (id: number) => void
    markTodoById: (id: number) => void
}

export const useTodoListStore = createGlobalState((): TodoListStoreReturn => {
    const todoList = ref<Todo[]>([]);
    const newTodo = ref<string>('')

    const setTodos = (todos: Todo[]) => {
        todoList.value = todos
    }

    const setTodo = (todo: string) => {
        newTodo.value = todo
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
        newTodo,
        setTodo,
        setTodos,
        removeTodoById,
        markTodoById
    }
})