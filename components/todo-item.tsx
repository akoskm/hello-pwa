import { ChangeEvent, useState } from "react";

export interface Todo {
  id: number;
  text: string;
  isCompleted: boolean;
}

interface TodoItemProps {
  todo: Todo;
  updateTodo: (todo: Todo) => void;
}

export const TodoItem = ({ todo, updateTodo }: TodoItemProps) => {
  const [text, setText] = useState(todo.text);
  const [isEditing, setIsEditing] = useState(false);

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleCheckboxChange = () => {
    updateTodo({
      ...todo,
      isCompleted: !todo.isCompleted,
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    updateTodo({
      ...todo,
      text,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setText(todo.text);
    setIsEditing(false);
  };

  return (
    <div className="flex flex-row gap-2 items-center">
      <input
        type="checkbox"
        className="checkbox"
        checked={todo.isCompleted}
        onChange={handleCheckboxChange}
        disabled={isEditing}
      />

      {isEditing ? (
        <div className="join">
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs join-item"
            value={text}
            onChange={handleTextChange}
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
          {todo.text}
        </span>
      )}
    </div>
  );
};
