import {useTodoList} from './../hooks/useTodoList.ts'
import type {Ref} from "vue";
import type {Todo, TodoMark} from "../types/types.ts";

const {
    todoList,
    getTodoList,
    remove,
    markTodo
} = useTodoList()

type ReturnShape = {
    todoList: Ref<Todo[]>
    loadTodoList: () => Promise<void>
    removeTodo: (id: number) => Promise<void>
    handleMarkTodo: (mark: TodoMark) => Promise<void>
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

    const removeTodo = async(id: number) => {
        try {
            await remove(id)
        } catch (error) {
            console.log('error')
            /* вывести тосты */
        }
    }

    const handleMarkTodo = async(mark: TodoMark) => {
        try {
            await markTodo(mark)
        } catch (error) {
            console.log('error')
            /* вывести тосты */
        }
    }

    /*TODO: добавить методы из хуков и обернуть их toasts */

    return {
        todoList,
        loadTodoList,
        removeTodo,
        handleMarkTodo
    }
}

