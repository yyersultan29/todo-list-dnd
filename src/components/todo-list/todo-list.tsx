import { FC, Fragment, useState } from "react";

import { Droppable } from "react-beautiful-dnd";

import Modal from "../modal/modal";
import { TodoForm } from "./todo-form";
import { TodoItem } from "./todo-item";
import EditIcon from "../../assets/pencil.png";
import { Todo } from "../../redux/todo-list/types";

interface IProps {
  todoListName: string,
  todoListId: string,
  todo: Todo,
  handleEditTodo: (oldTodoName: string, newTodoName: string) => void;
  handleCreateNewTodoItem: (todoListName: string, content: string) => void;
  handleEditTodoItem: (todoListId: string, todoListItemId: string, newTodoListItemName: string) => void
}

export const TodoList: FC<IProps> = ({ todoListName, todoListId, todo, handleCreateNewTodoItem, handleEditTodo, handleEditTodoItem }) => {

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);

  const handleOpenEditModal = () => setIsEditModalVisible(true);

  const handleCloseEditModal = () => setIsEditModalVisible(false);

  const handleOpenCreateModal = () => setIsCreateModalVisible(true);

  const handleCloseCreateModal = () => setIsCreateModalVisible(false);

  const handleCreateTodoItem = (value: string) => {
    handleCreateNewTodoItem(todoListId, value);
    handleCloseCreateModal();
  }

  const handleEditTodoName = (newTodoName: string) => {
    handleEditTodo(todoListId, newTodoName);
    handleCloseEditModal();
  };

  const handleEditTodoItemName = (todoListItemId: string, newTodoListItemName: string) => {
    handleEditTodoItem(todoListId, todoListItemId, newTodoListItemName);
  }

  return (
    <div key={todoListId} className="flex flex-col items-center bg-gray-200 p-2 rounded-lg">
      <div className="flex flex-col items-center " key={todoListId}>
        <div className="flex gap-[10px]">
          <h2>{todo.name}</h2>
          <button onClick={handleOpenEditModal}>
            <img src={EditIcon} alt="edit" width={20} height={20} />
          </button>
        </div>

        <div >
          <Droppable droppableId={todoListId} key={todoListId}>
            {(provided, snapshot) => {
              return (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={`
                  p-2 w-[250px] min-h-[600px] 
                  ${snapshot.isDraggingOver
                      ? "bg-gray-300"
                      : "bg-gray-200"}`}
                >
                  {todo.items.map((item: any, index: number) => {
                    return (
                      < Fragment key={item.id}>
                        <TodoItem
                          item={item}
                          index={index}
                          handleEditTodoItemName={handleEditTodoItemName}
                        />
                      </Fragment>
                    );
                  })}
                  {provided.placeholder}
                </div>
              );
            }}
          </Droppable>
        </div >
        <button
          className="pl-3 pr-3 pt-1 pb-1 rounded-lg bg-gray-200 hover:bg-gray-300"
          onClick={handleOpenCreateModal} >
          +
        </button>
      </div >

      {/* Create Todo Item  */}
      <Modal isOpen={isCreateModalVisible} onClose={handleCloseCreateModal}>
        <TodoForm
          name={`Create  Todo Item in "${todoListName}"`}
          onSubmit={handleCreateTodoItem}
        />
      </Modal>
      {/* Edit Todo */}
      <Modal isOpen={isEditModalVisible} onClose={handleCloseEditModal}>
        <TodoForm
          name={`Edit  Todo "${todoListName}"`}
          value={todoListName}
          onSubmit={handleEditTodoName}
        />
      </Modal>

    </div>
  )
}