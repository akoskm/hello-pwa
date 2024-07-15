import { useEffect, useState } from "react";
import { TodoList } from "./todo-list";
import type { Todo } from "@/types";
import { fetchTodos } from "@/fetchTodos";
import { syncTodos } from "@/syncTodos";

export function TodoListContainer() {
  const [todos, setTodos] = useState<Array<Todo>>([]);

  useEffect(() => {
    fetchTodos(setTodos);

    const onMessage = async (event: { data: { type: string } }) => {
      if (event.data && event.data.type === "START_SYNC") {
        console.log("started sync");
        await syncTodos();
        await fetchTodos(setTodos);
      }
    };

    if ("serviceWorker" in navigator) {
      const workerScript =
        process.env.NODE_ENV === "development"
          ? "service-worker-dev.js"
          : "service-worker.js";
      navigator.serviceWorker
        .register(workerScript, { type: "module" })
        .then((registration) => console.log("scope is: ", registration.scope));

      navigator.serviceWorker.addEventListener("message", onMessage);
    }
    return () => {
      navigator.serviceWorker.removeEventListener("message", onMessage);
    };
  }, [setTodos]);

  return (
    <div className="flex flex-col gap-4">
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
}
