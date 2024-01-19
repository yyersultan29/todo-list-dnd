import { FC, Fragment, useState } from "react";

import { Draggable } from "react-beautiful-dnd";

import Modal from "../modal/modal";
import { TodoForm } from "./todo-form";
import EditIcon from "../../assets/pencil.png";
import { ITodoItem } from "../../redux/todo-list/types";

interface IProps {
  item: ITodoItem,
  index: number
  handleEditTodoItemName: (todoListItemId: string, newTodoListItemName: string) => void
}

export const TodoItem: FC<IProps> = ({ item, index, handleEditTodoItemName }) => {

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const handleOpenModal = () => setIsEditModalVisible(true);

  const handleCloseModal = () => setIsEditModalVisible(false);

  const handleSubmit = (value: string) => {
    handleEditTodoItemName(item.id, value);
    handleCloseModal();
  }

  return (
    <Fragment>
      <Draggable
        key={item.id}
        draggableId={item.id}
        index={index}
      >
        {(provided) => {
          return (
            <div
              className={`w-full flex 
              justify-between select-none p-4 m-0 mb-2 min-h-[50px]
              text-black bg-white rounded-lg
              `}
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={{ ...provided.draggableProps.style }}
            >
              <div>{item.content}</div>
              <div className="cursor-pointer" onClick={handleOpenModal}>
                <img src={EditIcon} alt="edit" width={24} height={24} />
              </div>
            </div>
          );
        }}
      </Draggable>
      <Modal isOpen={isEditModalVisible} onClose={handleCloseModal}>
        <TodoForm value={item.content} name={"Edit Todo Item"} onSubmit={handleSubmit} />
      </Modal>
    </Fragment>
  )
}