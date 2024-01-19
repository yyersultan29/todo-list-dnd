import { useState } from "react";

import { v4 as uuid } from "uuid";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { DragDropContext, DropResult, } from "react-beautiful-dnd";

import Modal from "./components/modal/modal";
import { Todo } from "./redux/todo-list/types";
import { TodoList } from "./components/todo-list/todo-list";
import { selectTodoList } from "./redux/todo-list/selector";
import { todoListActions } from "./redux/todo-list/slice";
import { TodoForm } from "./components/todo-list/todo-form";

function App() {

  const dispatch = useDispatch();
  const todoList = useSelector(selectTodoList);

  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);

  const handleOpenCreateModal = () => setIsCreateModalVisible(true);

  const handleCloseCreateModal = () => setIsCreateModalVisible(false);

  const onDragEnd = (event: DropResult) => {
    if (!event.destination) return;
    const { source, destination } = event;

    dispatch(todoListActions.swapTodoItems({ source, destination }));
  };

  const handleCreateNewTodoItem = (todoListName: string, content: string) => {
    dispatch(todoListActions.createNewTodoItem({ todoListName, id: uuid(), content }));
  }

  const handleCreateNewTodo = (todoName: string) => {
    dispatch(todoListActions.createNewTodo(todoName));
    handleCloseCreateModal();
  }

  const handleEditTodo = (todoListId: string, newTodoName: string) => {
    dispatch(todoListActions.editTodo({ todoListId, newTodoName }))
  }
  const handleEditTodoItem = (todoListId: string, todoListItemId: string, newTodoListItemName: string) => {
    dispatch(todoListActions.editTodoItem({ todoListId, todoListItemId, newTodoListItemName }));
  }

  return (
    <div className="flex p-5 items-start">

      <DragDropContext
        onDragEnd={onDragEnd}
      >
        <div className="flex gap-5 mr-2">
          {Object.entries(todoList).map(([todoListId, todo]: [string, Todo]) => {
            return (
              <TodoList
                key={todoListId}
                todo={todo}
                todoListId={todoListId}
                todoListName={todo.name}
                handleEditTodo={handleEditTodo}
                handleEditTodoItem={handleEditTodoItem}
                handleCreateNewTodoItem={handleCreateNewTodoItem}
              />
            );
          })}
        </div>
      </DragDropContext>

      <button
        className="pl-3 pr-3 pt-1 pb-1 rounded-lg bg-gray-200 hover:bg-gray-300"
        onClick={handleOpenCreateModal}>
        +
      </button>

      {/* Create New Todo Column */}
      <Modal isOpen={isCreateModalVisible} onClose={handleCloseCreateModal}>
        <TodoForm name={`Create new Todo`} onSubmit={handleCreateNewTodo} />
      </Modal>

    </div>


  );
}

export default App;
