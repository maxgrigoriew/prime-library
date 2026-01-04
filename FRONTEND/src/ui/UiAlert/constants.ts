import type {AlertType} from "./types.ts";

export const ALERT_CLASSES_BY_TYPE: Record<AlertType, string> = {
    primary: 'bg-blue-5 text-white',
    secondary: 'bg-grey-1'
}