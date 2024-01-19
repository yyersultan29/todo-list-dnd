export interface TodoList {
  [key: string]: Todo;
}

export interface Todo {
  name: string;
  items: ITodoItem[];
}

export interface ITodoItem {
  id: string;
  content: string;
}

export interface TodoListState {
  todoList: TodoList;
}

export interface DragDropPathInfo {
  droppableId: string;
  index: number;
}

//  Payload Types

export interface SwapTodoItemsPayload {
  source: DragDropPathInfo;
  destination: DragDropPathInfo;
}

export interface CreateNewTodotemPayload {
  id: string;
  content: string;
  todoListName: string;
}

export interface EditTodoPayload {
  todoListId: string;
  newTodoName: string;
}

export interface EditTodoItemPayload {
  todoListId: string;
  todoListItemId: string;
  newTodoListItemName: string;
}
