export type Todo = {
    id: number;
    created: string; // ISO-строка даты (формат: "YYYY-MM-DDTHH:mm:ss.ssssssZ")
    updated: string; // аналогично created
    userId: number;
    text: string;
    done: boolean;
};