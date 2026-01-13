import type {Todo} from '../types/types.ts'
import {createGlobalState} from "@vueuse/core";
import {computed, type ComputedRef, reactive} from "vue";
import {DataState} from "@/shared/dataState";

export type TodoReturnShape = {
    todoState: TodoState
    isLoadingTodoList: ComputedRef<boolean>
    isLoadingMarkingTodo: ComputedRef<boolean>
    setMarkingTodoState: (todo: DataState) => void
    setSendingTodoState: (todo: DataState) => void
    setTodos: (todos: Todo[]) => void
    setTodo: (todo: string) => void
    removeTodoById: (id: number) => void
    markTodoById: (id: number) => void
}

type TodoState = {
    list: Todo[]
    newTodo: string
    markingTodoState: DataState
    sendingTodoState: DataState
}

const getDefaultState = (): TodoState => ({
    list:[],
    newTodo: '',
    markingTodoState: DataState.Init,
    sendingTodoState: DataState.Init
})

export const useTodoListStore = createGlobalState((): TodoReturnShape => {
    const todoState = reactive(getDefaultState())

    const isLoadingTodoList = computed(() => todoState.sendingTodoState === DataState.Loading)
    const isLoadingMarkingTodo = computed(() => todoState.markingTodoState === DataState.Loading)

    const setMarkingTodoState = (state: DataState): void => {
        todoState.markingTodoState = state
    }

    const setSendingTodoState = (state: DataState): void => {
        todoState.markingTodoState = state
    }

    const setTodos = (todos: Todo[]) => {
        todoState.list = todos
    }

    const setTodo = (todo: string) => {
        todoState.newTodo = todo
    }

    const removeTodoById = (id: number) => {
        const index = todoState.list.findIndex((todo: Todo) => todo.id === id)
        if (index === -1) {
            return
        }
        todoState.list.splice(index, 1)
    }

    const markTodoById = (id: number) => {
        const todo = todoState.list.find((todo: Todo) => todo.id === id);

        if (!todo) {
            return
        }

        todo.done = !todo.done
    };

    return {
        todoState,
        isLoadingTodoList,
        isLoadingMarkingTodo,

        setMarkingTodoState,
        setSendingTodoState,
        setTodo,
        setTodos,
        removeTodoById,
        markTodoById
    }
})