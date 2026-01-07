import {useTodoList} from './../hooks/useTodoList.ts'
import type {Ref} from "vue";
import type {Todo} from "../types/types.ts";

const {
    todoList,
    newTodo,
    getTodoList,
    removeTodo,
    markTodo,
    sendNewTodo
} = useTodoList()

type ReturnShape = {
    todoList: Ref<Todo[]>
    newTodo: Ref<string>
    loadTodoList: () => Promise<void>
    handleRemoveTodo: (id: number) => Promise<void>
    handleMarkTodo: (id: number) => Promise<void>
    handleSendNewTodo: () => Promise<void>
}

export const todoListFeature = (): ReturnShape => {
    const loadTodoList = async (): Promise<void> => {
        try {
            await getTodoList()
        } catch (error) {
            console.log('error')
            /* вывести тосты */
        }
    }

    const handleRemoveTodo = async (id: number) => {
        try {
            await removeTodo(id)
        } catch (error) {
            console.log('error')
            /* вывести тосты */
        }
    }

    const handleMarkTodo = async (id: number) => {
        try {
            await markTodo(id)
        } catch (error) {
            console.log('error')
            /* вывести тосты */
        }
    }

    const handleSendNewTodo = async () => {
        try {
            await sendNewTodo()
        } catch (error) {
            console.log('error')
            /* вывести тосты */
        }
    }

    /*TODO: добавить методы из хуков и обернуть их toasts */

    return {
        todoList,
        newTodo,
        loadTodoList,
        handleRemoveTodo,
        handleMarkTodo,
        handleSendNewTodo
    }
}

