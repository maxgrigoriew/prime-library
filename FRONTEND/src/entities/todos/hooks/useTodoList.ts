import {useTodoListStore} from "../stores/useTodoListStore.ts";
import type {Ref} from "vue";
import type {Todo} from "../types/types.ts";
import {TODO_API} from "../api";

const { todoList, setTodos } = useTodoListStore()
type ReturnShape = {
    todoList: Ref<Todo[]>
    getTodoList: () => Promise<void>
}


export const useTodoList = (): ReturnShape => {
    const getTodoList = async() => {
        try {
            const data = await TODO_API.getTodos()

            setTodos(data)
        } catch(error) {
            console.log('error', error)
        }
    }

    return {
        todoList,
        getTodoList
    }
}