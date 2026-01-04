import {useTodoList} from './../hooks/useTodoList.ts'
import type {Ref} from "vue";
import type {Todo} from "../types/types.ts";

const { todoList, getTodoList } = useTodoList()

type ReturnShape = {
    todoList: Ref<Todo[]>
    loadTodoList: () => Promise<void>
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

    return {
        todoList,
        loadTodoList
    }
}

