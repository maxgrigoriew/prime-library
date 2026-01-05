import {useTodoListStore} from "../stores/useTodoListStore.ts";
import type {Ref} from "vue";
import type {Todo} from "../types/types.ts";
import {TODO_API} from "../api";

const { todoList, setTodos, removeTodoById } = useTodoListStore()
type ReturnShape = {
    todoList: Ref<Todo[]>
    getTodoList: () => Promise<void>
    removeTodo: (id: number) => Promise<void>
}


export const useTodoList = (): ReturnShape => {
    const getTodoList = async() => {
        try {
            const {result} = await TODO_API.getTodos()

            setTodos(result)
        } catch(error) {
            console.log('error', error)
        }
    }

    const removeTodo = async(id: number) => {
        try {
            await TODO_API.removeTodo(id)

            removeTodoById(id)
        } catch(error) {
            console.log('error', error)
        }
    }

    return {
        todoList,
        getTodoList,
        removeTodo
    }
}