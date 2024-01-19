import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import {
  CreateNewTodotemPayload,
  EditTodoItemPayload,
  EditTodoPayload,
  SwapTodoItemsPayload,
  TodoList,
  TodoListState,
} from "./types";

const todoItems = [
  { id: uuid(), content: "First task" },
  { id: uuid(), content: "Second task" },
  { id: uuid(), content: "Third task" },
  { id: uuid(), content: "Fourth task" },
  { id: uuid(), content: "Fifth task" },
];

const todoList: TodoList = {
  [uuid()]: {
    name: "To Do",
    items: todoItems,
  },

  [uuid()]: {
    name: "In Progress",
    items: [],
  },
  [uuid()]: {
    name: "Done",
    items: [],
  },
};

const initialState: TodoListState = {
  todoList,
};

const todoListSlice = createSlice({
  name: "todoList",
  initialState,
  reducers: {
    swapTodoItems(state, action: PayloadAction<SwapTodoItemsPayload>) {
      const { source, destination } = action.payload;
      if (source.droppableId !== destination.droppableId) {
        const sourceColumn = state.todoList[source.droppableId];
        const destColumn = state.todoList[destination.droppableId];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];

        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);

        state.todoList[source.droppableId] = {
          ...sourceColumn,
          items: sourceItems,
        };

        state.todoList[destination.droppableId] = {
          ...destColumn,
          items: destItems,
        };
      } else {
        const column = state.todoList[source.droppableId];
        const copiedItems = [...column.items];
        const [removed] = copiedItems.splice(source.index, 1);

        copiedItems.splice(destination.index, 0, removed);

        state.todoList[source.droppableId] = {
          ...column,
          items: copiedItems,
        };
      }
    },
    createNewTodo(state, action: PayloadAction<string>) {
      state.todoList[uuid()] = {
        name: action.payload,
        items: [],
      };
    },
    createNewTodoItem(state, action: PayloadAction<CreateNewTodotemPayload>) {
      const { todoListName, id, content } = action.payload;
      state.todoList[todoListName].items.push({ id, content });
    },

    editTodo(state, action: PayloadAction<EditTodoPayload>) {
      const { todoListId, newTodoName } = action.payload;
      state.todoList[todoListId] = {
        name: newTodoName,
        items: state.todoList[todoListId].items,
      };
    },
    editTodoItem(state, action: PayloadAction<EditTodoItemPayload>) {
      const { todoListId, todoListItemId, newTodoListItemName } =
        action.payload;

      state.todoList[todoListId].items = state.todoList[todoListId].items.map(
        (item) =>
          item.id === todoListItemId
            ? { id: item.id, content: newTodoListItemName }
            : item
      );
    },
  },
});

export const todoListReducer = todoListSlice.reducer;
export const todoListActions = todoListSlice.actions;
