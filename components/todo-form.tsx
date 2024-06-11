import { ChangeEvent, useState } from "react";

interface TodoFormProps {
  addTodo: (text: string) => void;
}
export function TodoForm({ addTodo }: TodoFormProps) {
  const [newTodoText, setNewTodoText] = useState("");

  function handleNewTodoTextChange(e: ChangeEvent<HTMLInputElement>) {
    setNewTodoText(e.target.value);
  }

  return (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addTodo(newTodoText);
        setNewTodoText("");
      }}
      className="join"
    >
      <input
        name="todoText"
        type="text"
        placeholder="Add new todo"
        className={`input input-bordered w-full max-w-xs join-item`}
        onChange={handleNewTodoTextChange}
        value={newTodoText}
      />
      <button type="submit" className="btn join-item">
        Add Todo
      </button>
    </form>
  );
}
