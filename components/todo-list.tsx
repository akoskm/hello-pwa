import { TodoItem } from "./todo-item";
import { TodoForm } from "./todo-form";
import type { Todo } from "@/types";
import { TODO_KEY } from "@/constants";

interface TodoListProps {
  todos: Array<Todo>;
  setTodos: (todos: Array<Todo>) => void;
}

export function TodoList({ todos, setTodos }: TodoListProps) {
  const updateTodo = (updatedTodo: Todo) => {
    const updatedTodos = todos.map((todo) =>
      updatedTodo.id === todo.id ? updatedTodo : todo,
    );
    setTodos(updatedTodos);
    localStorage.setItem(TODO_KEY, JSON.stringify(updatedTodos));
  };

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(), // Using the current timestamp as a simple unique ID
      text: text,
      isCompleted: false,
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem(TODO_KEY, JSON.stringify(updatedTodos));
  };

  return (
    <>
      <TodoForm addTodo={addTodo} />
      <ul>
        {todos.map((todo: Todo) => (
          <TodoItem key={todo.id} todo={todo} updateTodo={updateTodo} />
        ))}
      </ul>
    </>
  );
}
