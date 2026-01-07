import {useTodoList} from './../hooks/useTodoList.ts'
import type {TodoReturnShape} from "../stores/useTodoListStore.ts";
import {useConfirm} from  "@/ui/UiConfirm/useConfirm.js"

const {showConfirm} = useConfirm()

const {
    todoState,
    isLoadingTodoList,
    getTodoList,
    removeTodo,
    markTodo,
    sendNewTodo
} = useTodoList()

type ReturnShape = Pick<TodoReturnShape, 'todoState' | 'isLoadingTodoList'> & {
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
            const result = await showConfirm({
                message: 'Вы действительно хотите удалить задачу?',
                cancelText: 'Отмена',
                confirmText: 'Да',
            })

            if (!result) {
                return
            }

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
        todoState,
        isLoadingTodoList,

        loadTodoList,
        handleRemoveTodo,
        handleMarkTodo,
        handleSendNewTodo
    }
}

