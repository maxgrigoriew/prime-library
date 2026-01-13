import {type TodoReturnShape, useTodoListStore} from "../stores/useTodoListStore.ts";
import type {Todo, TodoMark} from "../types/types.ts";
import {TODO_API} from "../api";
import {throwErrorApi} from "../../../shared/api/throwErrorApi.ts";
import {DataState} from "../../../shared/dataState";

const { todoState,isLoadingTodoList, isLoadingMarkingTodo, setMarkingTodoState, setSendingTodoState, setTodos, removeTodoById, markTodoById, setTodo } = useTodoListStore()
type ReturnShape = Pick<TodoReturnShape, 'todoState' | 'isLoadingTodoList' | 'isLoadingMarkingTodo'> & {
    getTodoList: () => Promise<void>
    removeTodo: (id: number) => Promise<void>
    markTodo: (id: number) => Promise<void>
    sendNewTodo: () => Promise<void>
}

export const useTodoList = (): ReturnShape => {
    const getTodoList = async() => {
        try {
            setMarkingTodoState(DataState.Loading)
            const {result} = await TODO_API.getTodos()

            await new Promise((resolve) => {
                setTimeout(() => resolve(result), 1000)
            })

            setTodos(result)
            setMarkingTodoState(DataState.Success)
        } catch(error) {
            console.log('error', error)
            setMarkingTodoState(DataState.Failed)
        } finally {
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

    const markTodo = async (id: number) => {
        try {
            const findTodo = todoState.list.find((todo: Todo) => todo.id === id)
            if (!findTodo) {
                return
            }

            const reqt: TodoMark = {
                id,
                done: !findTodo.done
            }

            setSendingTodoState(DataState.Loading)
            const response = await TODO_API.markTodo(reqt)
            await new Promise((resolve) => {
                setTimeout(() => resolve(response), 1000)
            })

            throwErrorApi(response)
            markTodoById(findTodo.id)
            setSendingTodoState(DataState.Success)
        } catch (e) {
            console.log('error:', e)
            setSendingTodoState(DataState.Failed)
        }
    }

    const sendNewTodo = async () => {
        const reqt = {
            text: todoState.newTodo,
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
        todoState,
        isLoadingTodoList,
        isLoadingMarkingTodo,

        getTodoList,
        removeTodo,
        markTodo,
        sendNewTodo
    }
}