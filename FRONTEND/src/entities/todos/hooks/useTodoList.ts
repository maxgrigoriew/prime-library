import {useTodoListStore} from "../stores/useTodoListStore.ts";
import type {Ref} from "vue";
import type {Todo, TodoMark} from "../types/types.ts";
import {TODO_API} from "../api";
import {throwErrorApi} from "../../../shared/api/throwErrorApi.ts";

const { todoList, newTodo, setTodos, removeTodoById, markTodoById, setTodo } = useTodoListStore()
type ReturnShape = {
    todoList: Ref<Todo[]>
    newTodo: Ref<string>
    getTodoList: () => Promise<void>
    remove: (id: number) => Promise<void>
    markTodo: (id: number) => Promise<void>
    sendNewTodo: () => Promise<void>
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

    const markTodo = async (id: number) => {
        try {
            const findTodo = todoList.value.find((todo: Todo) => todo.id === id)
            if (!findTodo) {
                return
            }

            const reqt: TodoMark = {
                id,
                done: !findTodo.done
            }

            const response = await TODO_API.markTodo(reqt)

            throwErrorApi(response)
            markTodoById(findTodo.id)
        } catch (e) {
            console.log('error:', e)
        }
    }

    const sendNewTodo = async () => {
        const reqt = {
            text: newTodo.value,
            id: null,
        }

        try {
            const result = await TODO_API.sendNewTodo(reqt)
            throwErrorApi(result)
            setTodo('')

            await getTodoList()
            } catch (e) {

        } finally {

        }
    }

    return {
        todoList,
        newTodo,
        getTodoList,
        remove,
        markTodo,
        sendNewTodo
    }
}