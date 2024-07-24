import { TodoItem } from "./todo-item";
import { TodoForm } from "./todo-form";
import type { Todo } from "@/types";
import { TODO_KEY } from "@/constants";

interface TodoListProps {
  todos: Array<Todo>;
  setTodos: (
    todos: Array<Todo> | ((todos: Array<Todo>) => Array<Todo>),
  ) => void;
}

export function TodoList({ todos, setTodos }: TodoListProps) {
  async function attemptSync() {
    const registration = await navigator.serviceWorker.ready;
    await (registration as any).sync.register("sync-todos");
  }

  const updateTodo = async (updatedTodo: Todo) => {
    const localStorageTodos =
      JSON.parse(localStorage.getItem("todos") ?? "[]") || [];

    const index = localStorageTodos.findIndex(
      (todo: Todo) => todo.id === updatedTodo.id,
    );

    if (index !== -1) {
      localStorageTodos[index] = updatedTodo;
    } else {
      localStorageTodos.push(updatedTodo);
    }
    localStorage.setItem("todos", JSON.stringify(localStorageTodos));

    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id !== updatedTodo.id) return todo;
        return updatedTodo;
      }),
    );

    await attemptSync();
  };

  const addTodo = async (description: string) => {
    const newTodo: Todo = {
      id: `temp_id_${new Date().getTime()}`,
      description,
      is_completed: false,
    };
    const todos = JSON.parse(localStorage.getItem(TODO_KEY) ?? "[]") || [];
    todos.push(newTodo);
    localStorage.setItem(TODO_KEY, JSON.stringify(todos));
    setTodos((prevTodos) => [...prevTodos, newTodo]);

    await attemptSync();
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
