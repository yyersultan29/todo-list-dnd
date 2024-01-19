import { RootState } from "../store";

export const selectTodoList = (state: RootState) => state.todoList.todoList;
