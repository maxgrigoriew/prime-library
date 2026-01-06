import {getTodos} from "./methods/getTodos.ts";
import {removeTodo} from "./methods/removeTodo.ts";
import {markTodo} from "./methods/markTodo.ts";
import {sendNewTodo} from "./methods/sendNewTodo.ts";

export const TODO_API = {
    getTodos,
    removeTodo,
    markTodo,
    sendNewTodo
}