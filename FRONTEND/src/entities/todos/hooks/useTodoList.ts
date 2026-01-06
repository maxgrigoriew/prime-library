import {useTodoListStore} from "../stores/useTodoListStore.ts";
import type {Ref} from "vue";
import type {Todo, TodoMark} from "../types/types.ts";
import {TODO_API} from "../api";

const { todoList, setTodos, removeTodoById, markTodoById } = useTodoListStore()
type ReturnShape = {
    todoList: Ref<Todo[]>
    getTodoList: () => Promise<void>
    remove: (id: number) => Promise<void>
    markTodo: (mark: TodoMark) => Promise<void>
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

    const remove = async(id: number) => {
        try {
            await TODO_API.removeTodo(id)

            removeTodoById(id)
        } catch(error) {
            console.log('error', error)
        }
    }

    const markTodo = async (mark: TodoMark) => {
        try {
            await TODO_API.markTodo(mark)
            markTodoById(mark.id)
        } catch (e) {
            console.log(e)
        }
    }

    return {
        todoList,
        getTodoList,
        remove,
        markTodo
    }
}