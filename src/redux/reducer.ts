import { combineReducers } from "redux";
import { todoListReducer } from "./todo-list/slice";

export const rootReducer = combineReducers({
  todoList: todoListReducer,
});
