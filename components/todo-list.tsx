import { useState, useEffect, ChangeEvent } from "react";
import { Todo, TodoItem } from "./todo-item";
import { TodoForm } from "./todo-form";

const TODO_KEY = "todos";

export function TodoList() {
  const initialTodos = [
    { id: 1, text: "Todo 1", isCompleted: false },
    { id: 2, text: "Todo 2", isCompleted: false },
    { id: 3, text: "Todo 3", isCompleted: false },
  ];
  const [todos, setTodos] = useState<Array<Todo>>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTodos = localStorage.getItem(TODO_KEY);
      if (savedTodos) {
        setTodos(JSON.parse(savedTodos));
      } else {
        setTodos(initialTodos);
      }
    }
  }, []);

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
