import type { Todo } from "@/types";
import { ChangeEvent, useState } from "react";

interface TodoItemProps {
  todo: Todo;
  updateTodo: (todo: Todo) => void;
}

export const TodoItem = ({ todo, updateTodo }: TodoItemProps) => {
  const [description, setDescription] = useState(todo.description);
  const [isEditing, setIsEditing] = useState(false);

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleCheckboxChange = () => {
    updateTodo({
      ...todo,
      is_completed: !todo.is_completed,
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    updateTodo({
      ...todo,
      description: description,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setDescription(todo.description);
    setIsEditing(false);
  };

  return (
    <div className="flex flex-row gap-2 items-center">
      <input
        type="checkbox"
        className="checkbox"
        checked={todo.is_completed}
        onChange={handleCheckboxChange}
        disabled={isEditing}
      />

      {isEditing ? (
        <div className="join">
          <input
            type="description"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs join-item"
            value={description}
            onChange={handleDescriptionChange}
            onClick={(e) => {
              e.stopPropagation();
              handleEdit();
            }}
          />
          <button className="btn join-item" onClick={handleSave}>
            Save
          </button>
          <button className="btn join-item" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      ) : (
        <span onClick={handleEdit} className="text-lg">
          {todo.description}
        </span>
      )}
    </div>
  );
};
