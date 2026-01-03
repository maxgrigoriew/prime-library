import {login} from "./methods/login.ts";
import {sessionCheck} from "./methods/sessionCheck.ts";

export const BASE_URL = 'user/session/'

export const AUTH_API = {
    login,
    sessionCheck
}