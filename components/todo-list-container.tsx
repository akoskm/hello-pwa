import { useEffect, useState } from "react";
import { TodoList } from "./todo-list";
import type { Todo } from "@/types";
import { TODO_KEY } from "@/constants";

export function TodoListContainer() {
  const initialTodos = [
    { id: 1, description: "Todo 1", is_completed: false },
    { id: 2, description: "Todo 2", is_completed: false },
    { id: 3, description: "Todo 3", is_completed: false },
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

  return (
    <div className="flex flex-col gap-4">
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
}
