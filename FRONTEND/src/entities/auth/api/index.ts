import {login} from "./methods/login.ts";
import {logout} from "./methods/logout.ts";
import {sessionCheck} from "./methods/sessionCheck.ts";

export const BASE_URL = 'user/session/'

export const AUTH_API = {
    login,
    logout,
    sessionCheck
}