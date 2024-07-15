import { TODO_KEY } from "@/constants";
import { createClient } from "./utils/supabase/client";

export const syncTodos = async () => {
  const todos = JSON.parse(localStorage.getItem(TODO_KEY) ?? "[]") || [];
  const unsyncedTodos = [];

  const supabase = createClient();
  for (const todo of todos) {
    if (todo.id.startsWith("temp_id")) delete todo.id;

    const { error } = await supabase.from(TODO_KEY).upsert(todo).select("id");
    if (error) {
      console.error("Error syncing todo:", error);
      unsyncedTodos.push(todo);
    }
  }

  // Update localStorage with only the unsynced todos
  localStorage.setItem(TODO_KEY, JSON.stringify(unsyncedTodos));
};
